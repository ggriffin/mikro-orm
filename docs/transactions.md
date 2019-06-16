---
---

# Transactions and concurrency

## Transaction demarcation

Transaction demarcation is the task of defining your transaction boundaries. Proper 
transaction demarcation is very important because if not done properly it can negatively 
affect the performance of your application. Many databases and database abstraction 
layers by default operate in auto-commit mode, which means that every single SQL statement 
is wrapped in a small transaction. Without any explicit transaction demarcation from your 
side, this quickly results in poor performance because transactions are not cheap. 

For the most part, MikroORM already takes care of proper transaction demarcation for you: 
All the write operations (INSERT/UPDATE/DELETE) are queued until `EntityManager.flush()` 
is invoked which wraps all of these changes in a single transaction.

However, MikroORM also allows (and encourages) you to take over and control transaction 
demarcation yourself.

These are two ways to deal with transactions when using the MikroORM and are now described 
in more detail.

### Approach 1: Implicitly

The first approach is to use the implicit transaction handling provided by the MikroORM 
`EntityManager`. Given the following code snippet, without any explicit transaction 
demarcation:

```typescript
const user = new User(...);
user.name = 'George';
await orm.em.persistAndFlush(user);
```

Since we do not do any custom transaction demarcation in the above code, `EntityManager.flush()` 
will begin and commit/rollback a transaction. This behavior is made possible by the 
aggregation of the DML operations by the MikroORM and is sufficient if all the data 
manipulation that is part of a unit of work happens through the domain model and thus 
the ORM.

### Approach 2: Explicitly

The explicit alternative is to use the transactions API directly to control the boundaries. 
The code then looks like this:

```typescript
await orm.em.beginTransaction(); // suspend auto-commit

try {
  //... do some work
  const user = new User(...);
  user.name = 'George';
  await orm.em.persistAndFlush(user);
  await orm.em.commit();
} catch (e) {
  await orm.em.rollback();
  throw e;
}
```

Explicit transaction demarcation is required when you want to include custom DBAL operations 
in a unit of work or when you want to make use of some methods of the EntityManager API 
that require an active transaction. Such methods will throw a `ValidationError` to inform 
you of that requirement.

A more convenient alternative for explicit transaction demarcation is the use of provided 
control abstractions in the form of `EntityManager.transactional(cb)`. When used, these 
control abstractions ensure that you never forget to rollback the transaction, in addition 
to the obvious code reduction. An example that is functionally equivalent to the previously 
shown code looks as follows:

```typescript
orm.em.transactional(_em => {
  //... do some work
  const user = new User(...);
  user.name = 'George';
  _em.persistLater(user);
});
```

`EntityManager.transactional(cb)` will flush the inner `EntityManager` prior to transaction 
commit.

### Exception Handling

When using implicit transaction demarcation and an exception occurs during 
`EntityManager.flush()`, the transaction is automatically rolled back.

When using explicit transaction demarcation and an exception occurs, the transaction should 
be rolled back immediately as demonstrated in the example above. This can be handled elegantly 
by the control abstractions shown earlier. Note that when catching Exception you should 
generally re-throw the exception. If you intend to recover from some exceptions, catch them 
explicitly in earlier catch blocks (but do not forget to rollback the transaction). All 
other best practices of exception handling apply similarly (i.e. either log or re-throw, 
not both, etc.).

As a result of this procedure, all previously managed or removed instances of the `EntityManager` 
become detached. The state of the detached objects will be the state at the point at which the 
transaction was rolled back. The state of the objects is in no way rolled back and thus the 
objects are now out of sync with the database. The application can continue to use the detached 
objects, knowing that their state is potentially no longer accurate.

If you intend to start another unit of work after an exception has occurred you should do 
that with a new `EntityManager`. Simply use `EntityManager.fork()` to obtain fresh copy 
with cleared identity map. 

## Locking Support

MikroORM offers support for Pessimistic and Optimistic locking strategies natively. This allows 
to take very fine-grained control over what kind of locking is required for your Entities in your 
application.

### Optimistic Locking

Database transactions are fine for concurrency control during a single request. However, a 
database transaction should not span across requests, the so-called "user think time". Therefore 
a long-running "business transaction" that spans multiple requests needs to involve several 
database transactions. Thus, database transactions alone can no longer control concurrency 
during such a long-running business transaction. Concurrency control becomes the partial 
responsibility of the application itself.

MikroORM has integrated support for automatic optimistic locking via a version field. In 
this approach any entity that should be protected against concurrent modifications during 
long-running business transactions gets a version field that is either a simple number 
(mapping type: integer) or a timestamp (mapping type: datetime). When changes to such an 
entity are persisted at the end of a long-running conversation the version of the entity 
is compared to the version in the database and if they don't match, a `ValidationError` 
is thrown, indicating that the entity has been modified by someone else already.

You designate a version field in an entity as follows. In this example we'll use an integer.

```typescript
export class User {
  // ...
  @Property({ version: true })
  version: number;
  // ...
}
```

Alternatively a datetime type can be used (which maps to a SQL timestamp or datetime):

```typescript
export class User {
  // ...
  @Property({ version: true })
  version: Date;
  // ...
}
```

Version numbers (not timestamps) should however be preferred as they can not potentially 
conflict in a highly concurrent environment, unlike timestamps where this is a possibility, 
depending on the resolution of the timestamp on the particular database platform.

When a version conflict is encountered during `EntityManager.flush()`, a `ValidationError` 
is thrown and the active transaction rolled back (or marked for rollback). This exception 
can be caught and handled. Potential responses to a `ValidationError` are to present the 
conflict to the user or to refresh or reload objects in a new transaction and then retrying 
the transaction.

The time between showing an update form and actually modifying the entity can in the worst 
scenario be as long as your applications session timeout. If changes happen to the entity 
in that time frame you want to know directly when retrieving the entity that you will hit 
an optimistic locking exception:

You can always verify the version of an entity during a request either when calling 
`EntityManager.findOne()`:

```typescript
const theEntityId = 1;
const expectedVersion = 184;

try {
  const entity = await orm.em.findOne(User, theEntityId, LockMode.OPTIMISTIC, expectedVersion);

  // do the work

  await orm.em.flush();
} catch (e) {
  console.log('Sorry, but someone else has already changed this entity. Please apply the changes again!');
}
```

Or you can use `EntityManager.lock()` to find out:

```typescript
const theEntityId = 1;
const expectedVersion = 184;
const entity = await orm.em.findOne(User, theEntityId);

try {
    // assert version
    await orm.em.lock(entity, LockMode.OPTIMISTIC, expectedVersion);
} catch (e) {
    console.log('Sorry, but someone else has already changed this entity. Please apply the changes again!');
}
```

#### Important Implementation Notes

You can easily get the optimistic locking workflow wrong if you compare the wrong versions. 
Say you have Alice and Bob editing a hypothetical blog post:

- Alice reads the headline of the blog post being "Foo", at optimistic lock version 1 (GET Request)
- Bob reads the headline of the blog post being "Foo", at optimistic lock version 1 (GET Request)
- Bob updates the headline to "Bar", upgrading the optimistic lock version to 2 (POST Request of a Form)
- Alice updates the headline to "Baz", ... (POST Request of a Form)

Now at the last stage of this scenario the blog post has to be read again from the database 
before Alice's headline can be applied. At this point you will want to check if the blog 
post is still at version 1 (which it is not in this scenario).

Using optimistic locking correctly, you **have** to add the version as an additional hidden 
field (or into the session for more safety). Otherwise you cannot verify the version is still 
the one being originally read from the database when Alice performed her GET request for the 
blog post. If this happens you might see lost updates you wanted to prevent with Optimistic 
Locking.

See the example code, The form (GET Request):

```typescript
const post = await orm.em.findOne(BlogPost, 123456);
let html = '';
html += `<input type="hidden" name="id" value="${post.id}" />`;
html += `<input type="hidden" name="version" value="${post.version}" />`;
```

And the change headline action (POST Request):

```typescript
const postId = +req.query.id;
const postVersion = +req.query.version;
const post = await orm.em.findOne(BlogPost, postId, LockMode.OPTIMISTIC, postVersion);
```

### Pessimistic Locking

MikroORM supports Pessimistic Locking at the database level. No attempt is being made to implement 
pessimistic locking inside MikroORM, rather vendor-specific and ANSI-SQL commands are used to 
acquire row-level locks. Every Entity can be part of a pessimistic lock, there is no special 
metadata required to use this feature.

However for Pessimistic Locking to work you have to disable the Auto-Commit Mode of your Database 
and start a transaction around your pessimistic lock use-case using the "Approach 2: Explicit 
Transaction Demarcation" described above. MikroORM will throw an Exception if you attempt to 
acquire an pessimistic lock and no transaction is running.

MikroORM currently supports two pessimistic lock modes:

- Pessimistic Write (`LockMode.PESSIMISTIC_WRITE`), locks the underlying database rows for concurrent Read and Write Operations.
- Pessimistic Read (`LockMode.PESSIMISTIC_READ`), locks other concurrent requests that attempt to update or lock rows in write mode.

You can use pessimistic locks in three different scenarios:

1. Using `EntityManager.findOne(className, id, LockMode.PESSIMISTIC_WRITE)` or `EntityManager.findOne(className, id, LockMode.PESSIMISTIC_READ)`
2. Using `EntityManager.lock(entity, LockMode.PESSIMISTIC_WRITE)` or `EntityManager.lock(entity, LockMode.PESSIMISTIC_READ)`
3. Using `QueryBuilder.setLockMode(LockMode.PESSIMISTIC_WRITE)` or `QueryBuilder.setLockMode(LockMode.PESSIMISTIC_READ)`

> This part of documentation is highly inspired by [doctrine internals docs](https://www.doctrine-project.org/projects/doctrine-orm/en/latest/reference/transactions-and-concurrency.html)
> as the behaviour here is pretty much the same.