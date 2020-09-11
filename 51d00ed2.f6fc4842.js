(window.webpackJsonp=window.webpackJsonp||[]).push([[105],{163:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return s})),n.d(t,"rightToc",(function(){return l})),n.d(t,"default",(function(){return b}));var i=n(1),a=n(6),r=(n(0),n(394)),o={title:"Working with Entity Manager",sidebar_label:"Entity Manager"},s={unversionedId:"entity-manager",id:"entity-manager",isDocsHomePage:!1,title:"Working with Entity Manager",description:"Persist and Flush",source:"@site/docs/entity-manager.md",slug:"/entity-manager",permalink:"/docs/next/entity-manager",editUrl:"https://github.com/mikro-orm/mikro-orm/edit/master/docs/docs/entity-manager.md",version:"current",lastUpdatedBy:"Martin Ad\xe1mek",lastUpdatedAt:1596970088,sidebar_label:"Entity Manager",sidebar:"docs",previous:{title:"Modeling Entity Relationships",permalink:"/docs/next/relationships"},next:{title:"Using EntityRepository instead of EntityManager",permalink:"/docs/next/repositories"}},l=[{value:"Persist and Flush",id:"persist-and-flush",children:[]},{value:"Persisting and Cascading",id:"persisting-and-cascading",children:[]},{value:"Fetching Entities with EntityManager",id:"fetching-entities-with-entitymanager",children:[{value:"Conditions Object (<code>FilterQuery&lt;T&gt;</code>)",id:"conditions-object-filterqueryt",children:[]},{value:"Searching by referenced entity fields",id:"searching-by-referenced-entity-fields",children:[]},{value:"Fetching Partial Entities",id:"fetching-partial-entities",children:[]},{value:"Fetching Paginated Results",id:"fetching-paginated-results",children:[]},{value:"Handling Not Found Entities",id:"handling-not-found-entities",children:[]}]},{value:"Type of Fetched Entities",id:"type-of-fetched-entities",children:[]},{value:"Entity Repositories",id:"entity-repositories",children:[]},{value:"EntityManager API",id:"entitymanager-api",children:[]}],c={rightToc:l};function b(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(r.b)("wrapper",Object(i.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("h2",{id:"persist-and-flush"},"Persist and Flush"),Object(r.b)("p",null,"There are 2 methods we should first describe to understand how persisting works in MikroORM:\n",Object(r.b)("inlineCode",{parentName:"p"},"em.persist()")," and ",Object(r.b)("inlineCode",{parentName:"p"},"em.flush()"),"."),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"em.persist(entity)")," is used to mark new entities for future persisting.\nIt will make the entity managed by given ",Object(r.b)("inlineCode",{parentName:"p"},"EntityManager")," and once ",Object(r.b)("inlineCode",{parentName:"p"},"flush")," will be called, it\nwill be written to the database. "),Object(r.b)("p",null,"To understand ",Object(r.b)("inlineCode",{parentName:"p"},"flush"),", lets first define what managed entity is: An entity is managed if\nit\u2019s fetched from the database (via ",Object(r.b)("inlineCode",{parentName:"p"},"em.find()"),", ",Object(r.b)("inlineCode",{parentName:"p"},"em.findOne()")," or via other managed entity)\nor registered as new through ",Object(r.b)("inlineCode",{parentName:"p"},"em.persist()"),"."),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"em.flush()")," will go through all managed entities, compute appropriate change sets and\nperform according database queries. As an entity loaded from database becomes managed\nautomatically, you do not have to call persist on those, and flush is enough to update\nthem."),Object(r.b)("pre",null,Object(r.b)("code",Object(i.a)({parentName:"pre"},{className:"language-typescript"}),"const book = await orm.em.findOne(Book, 1);\nbook.title = 'How to persist things...';\n\n// no need to persist `book` as its already managed by the EM\nawait orm.em.flush();\n")),Object(r.b)("h2",{id:"persisting-and-cascading"},"Persisting and Cascading"),Object(r.b)("p",null,"To save entity state to database, you need to persist it. Persist takes care or deciding\nwhether to use ",Object(r.b)("inlineCode",{parentName:"p"},"insert")," or ",Object(r.b)("inlineCode",{parentName:"p"},"update")," and computes appropriate change-set. Entity references\nthat are not persisted yet (does not have identifier) will be cascade persisted automatically. "),Object(r.b)("pre",null,Object(r.b)("code",Object(i.a)({parentName:"pre"},{className:"language-typescript"}),"// use constructors in your entities for required parameters\nconst author = new Author('Jon Snow', 'snow@wall.st');\nauthor.born = new Date();\n\nconst publisher = new Publisher('7K publisher');\n\nconst book1 = new Book('My Life on The Wall, part 1', author);\nbook1.publisher = publisher;\nconst book2 = new Book('My Life on The Wall, part 2', author);\nbook2.publisher = publisher;\nconst book3 = new Book('My Life on The Wall, part 3', author);\nbook3.publisher = publisher;\n\n// just persist books, author and publisher will be automatically cascade persisted\nawait orm.em.persistAndFlush([book1, book2, book3]);\n\n// or one by one\norm.em.persist(book1);\norm.em.persist(book2);\norm.em.persist(book3); \nawait orm.em.flush(); // flush everything to database at once\n")),Object(r.b)("h2",{id:"fetching-entities-with-entitymanager"},"Fetching Entities with EntityManager"),Object(r.b)("p",null,"To fetch entities from database you can use ",Object(r.b)("inlineCode",{parentName:"p"},"find()")," and ",Object(r.b)("inlineCode",{parentName:"p"},"findOne()")," of ",Object(r.b)("inlineCode",{parentName:"p"},"EntityManager"),": "),Object(r.b)("p",null,"Example:"),Object(r.b)("pre",null,Object(r.b)("code",Object(i.a)({parentName:"pre"},{className:"language-typescript"}),"const author = await orm.em.findOne(Author, '...id...');\nconst books = await orm.em.find(Book, {});\n\nfor (const author of authors) {\n  console.log(author.name); // Jon Snow\n\n  for (const book of author.books) {\n    console.log(book.title); // initialized\n    console.log(book.author.isInitialized()); // true\n    console.log(book.author.id);\n    console.log(book.author.name); // Jon Snow\n    console.log(book.publisher); // just reference\n    console.log(book.publisher.isInitialized()); // false\n    console.log(book.publisher.id);\n    console.log(book.publisher.name); // undefined\n  }\n}\n")),Object(r.b)("p",null,"To populate entity relations, you can use ",Object(r.b)("inlineCode",{parentName:"p"},"populate")," parameter."),Object(r.b)("pre",null,Object(r.b)("code",Object(i.a)({parentName:"pre"},{className:"language-typescript"}),"const books = await orm.em.find(Book, { foo: 1 }, ['author.friends']);\n")),Object(r.b)("p",null,"You can also use ",Object(r.b)("inlineCode",{parentName:"p"},"em.populate()")," helper to populate relations (or to ensure they\nare fully populated) on already loaded entities. This is also handy when loading\nentities via ",Object(r.b)("inlineCode",{parentName:"p"},"QueryBuilder"),":"),Object(r.b)("pre",null,Object(r.b)("code",Object(i.a)({parentName:"pre"},{className:"language-typescript"}),"const authors = await orm.em.createQueryBuilder(Author).select('*').getResult();\nawait em.populate(authors, ['books.tags']);\n\n// now your Author entities will have `books` collections populated, \n// as well as they will have their `tags` collections populated.\nconsole.log(authors[0].books[0].tags[0]); // initialized BookTag\n")),Object(r.b)("h3",{id:"conditions-object-filterqueryt"},"Conditions Object (",Object(r.b)("inlineCode",{parentName:"h3"},"FilterQuery<T>"),")"),Object(r.b)("p",null,"Querying entities via conditions object (",Object(r.b)("inlineCode",{parentName:"p"},"where")," in ",Object(r.b)("inlineCode",{parentName:"p"},"em.find(Entity, where: FilterQuery<T>)"),")\nsupports many different ways:"),Object(r.b)("pre",null,Object(r.b)("code",Object(i.a)({parentName:"pre"},{className:"language-typescript"}),"// search by entity properties\nconst users = await orm.em.find(User, { firstName: 'John' });\n\n// for searching by reference you can use primary key directly\nconst id = 1;\nconst users = await orm.em.find(User, { organization: id });\n\n// or pass unpopulated reference (including `Reference` wrapper)\nconst ref = await orm.em.getReference(Organization, id);\nconst users = await orm.em.find(User, { organization: ref });\n\n// fully populated entities as also supported\nconst ent = await orm.em.findOne(Organization, id);\nconst users = await orm.em.find(User, { organization: ent });\n\n// complex queries with operators\nconst users = await orm.em.find(User, { $and: [{ id: { $nin: [3, 4] } }, { id: { $gt: 2 } }] });\n\n// you can also search for array of primary keys directly\nconst users = await orm.em.find(User, [1, 2, 3, 4, 5]);\n\n// and in findOne all of this works, plus you can search by single primary key\nconst user1 = await orm.em.findOne(User, 1);\n")),Object(r.b)("p",null,"As you can see in the fifth example, one can also use operators like ",Object(r.b)("inlineCode",{parentName:"p"},"$and"),", ",Object(r.b)("inlineCode",{parentName:"p"},"$or"),", ",Object(r.b)("inlineCode",{parentName:"p"},"$gte"),",\n",Object(r.b)("inlineCode",{parentName:"p"},"$gt"),", ",Object(r.b)("inlineCode",{parentName:"p"},"$lte"),", ",Object(r.b)("inlineCode",{parentName:"p"},"$lt"),", ",Object(r.b)("inlineCode",{parentName:"p"},"$in"),", ",Object(r.b)("inlineCode",{parentName:"p"},"$nin"),", ",Object(r.b)("inlineCode",{parentName:"p"},"$eq"),", ",Object(r.b)("inlineCode",{parentName:"p"},"$ne"),", ",Object(r.b)("inlineCode",{parentName:"p"},"$like"),", ",Object(r.b)("inlineCode",{parentName:"p"},"$re"),". More about that can be found in\n",Object(r.b)("a",Object(i.a)({parentName:"p"},{href:"/docs/next/query-conditions"}),"Query Conditions")," section. "),Object(r.b)("h4",{id:"mitigating-type-instantiation-is-excessively-deep-and-possibly-infinitets2589-error"},"Mitigating ",Object(r.b)("inlineCode",{parentName:"h4"},"Type instantiation is excessively deep and possibly infinite.ts(2589)")," error"),Object(r.b)("p",null,"Sometimes you might be facing TypeScript errors caused by too complex query for it to\nproperly infer all types. Usually it can be solved by providing the type argument\nexplicitly."),Object(r.b)("p",null,"You can also opt in to use repository instead, as there the type inference should not be\nproblematic. "),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},"As a last resort, you can always type cast the query to ",Object(r.b)("inlineCode",{parentName:"p"},"any"),".")),Object(r.b)("pre",null,Object(r.b)("code",Object(i.a)({parentName:"pre"},{className:"language-typescript"}),"const books = await orm.em.find<Book>(Book, { ... your complex query ... });\n// or\nconst books = await orm.em.getRepository(Book).find({ ... your complex query ... });\n// or\nconst books = await orm.em.find<any>(Book, { ... your complex query ... }) as Book[];\n")),Object(r.b)("p",null,"Another problem you might be facing is ",Object(r.b)("inlineCode",{parentName:"p"},"RangeError: Maximum call stack size exceeded")," error\nthrown during TypeScript compilation (usually from file ",Object(r.b)("inlineCode",{parentName:"p"},"node_modules/typescript/lib/typescript.js"),").\nThe solution to this is the same, just provide the type argument explicitly."),Object(r.b)("h3",{id:"searching-by-referenced-entity-fields"},"Searching by referenced entity fields"),Object(r.b)("p",null,"You can also search by referenced entity properties. Simply pass nested where condition like\nthis and all requested relationships will be automatically joined. Currently it will only join\nthem so you can search and sort by those. To populate entities, do not forget to pass the populate\nparameter as well. "),Object(r.b)("pre",null,Object(r.b)("code",Object(i.a)({parentName:"pre"},{className:"language-typescript"}),"// find author of a book that has tag specified by name\nconst author = await orm.em.findOne(Author, { books: { tags: { name: 'Tag name' } } });\nconsole.log(author.books.isInitialized()); // false, as it only works for query and sort\n\nconst author = await orm.em.findOne(Author, { books: { tags: { name: 'Tag name' } } }, ['books.tags']);\nconsole.log(author.books.isInitialized()); // true, because it was populated\nconsole.log(author.books[0].tags.isInitialized()); // true, because it was populated\nconsole.log(author.books[0].tags[0].isInitialized()); // true, because it was populated\n")),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},"This feature is fully available only for SQL drivers. In MongoDB always you need to\nquery from the owning side - so in the example above, first load book tag by name,\nthen associated book, then the author. Another option is to denormalize the schema.  ")),Object(r.b)("h3",{id:"fetching-partial-entities"},"Fetching Partial Entities"),Object(r.b)("p",null,"When fetching single entity, you can choose to select only parts of an entity via ",Object(r.b)("inlineCode",{parentName:"p"},"options.fields"),":"),Object(r.b)("pre",null,Object(r.b)("code",Object(i.a)({parentName:"pre"},{className:"language-typescript"}),"const author = await orm.em.findOne(Author, '...', { fields: ['name', 'born'] });\nconsole.log(author.id); // PK is always selected\nconsole.log(author.name); // Jon Snow\nconsole.log(author.email); // undefined\n")),Object(r.b)("h3",{id:"fetching-paginated-results"},"Fetching Paginated Results"),Object(r.b)("p",null,"If you are going to paginate your results, you can use ",Object(r.b)("inlineCode",{parentName:"p"},"em.findAndCount()")," that will return\ntotal count of entities before applying limit and offset."),Object(r.b)("pre",null,Object(r.b)("code",Object(i.a)({parentName:"pre"},{className:"language-typescript"}),"const [authors, count] = await orm.em.findAndCount(Author, { ... }, { limit: 10, offset: 50 });\nconsole.log(authors.length); // based on limit parameter, e.g. 10\nconsole.log(count); // total count, e.g. 1327\n")),Object(r.b)("h3",{id:"handling-not-found-entities"},"Handling Not Found Entities"),Object(r.b)("p",null,"When you call ",Object(r.b)("inlineCode",{parentName:"p"},"em.findOne()")," and no entity is found based on your criteria, ",Object(r.b)("inlineCode",{parentName:"p"},"null")," will be\nreturned. If you rather have an ",Object(r.b)("inlineCode",{parentName:"p"},"Error")," instance thrown, you can use ",Object(r.b)("inlineCode",{parentName:"p"},"em.findOneOrFail()"),":"),Object(r.b)("pre",null,Object(r.b)("code",Object(i.a)({parentName:"pre"},{className:"language-typescript"}),"const author = await orm.em.findOne(Author, { name: 'does-not-exist' });\nconsole.log(author === null); // true\n\ntry {\n  const author = await orm.em.findOneOrFail(Author, { name: 'does-not-exist' });\n  // author will be always found here\n} catch (e) {\n  console.error('Not found', e);\n}\n")),Object(r.b)("p",null,"You can customize the error either globally via ",Object(r.b)("inlineCode",{parentName:"p"},"findOneOrFailHandler")," option, or locally via\n",Object(r.b)("inlineCode",{parentName:"p"},"failHandler")," option in ",Object(r.b)("inlineCode",{parentName:"p"},"findOneOrFail")," call."),Object(r.b)("pre",null,Object(r.b)("code",Object(i.a)({parentName:"pre"},{className:"language-typescript"}),"try {\n  const author = await orm.em.findOneOrFail(Author, { name: 'does-not-exist' }, {\n    failHandler: (entityName: string, where: Record<string, any> | IPrimaryKey) => new Error(`Failed: ${entityName} in ${util.inspect(where)}`)\n  });\n} catch (e) {\n  console.error(e); // your custom error\n}\n")),Object(r.b)("h2",{id:"type-of-fetched-entities"},"Type of Fetched Entities"),Object(r.b)("p",null,"Both ",Object(r.b)("inlineCode",{parentName:"p"},"em.find")," and ",Object(r.b)("inlineCode",{parentName:"p"},"em.findOne()")," methods have generic return types.\nAll of following examples are equal and will let typescript correctly infer the entity type:"),Object(r.b)("pre",null,Object(r.b)("code",Object(i.a)({parentName:"pre"},{className:"language-typescript"}),"const author1 = await orm.em.findOne<Author>(Author.name, '...id...');\nconst author2 = await orm.em.findOne<Author>('Author', '...id...');\nconst author3 = await orm.em.findOne(Author, '...id...');\n")),Object(r.b)("p",null,"As the last one is the least verbose, it should be preferred. "),Object(r.b)("h2",{id:"entity-repositories"},"Entity Repositories"),Object(r.b)("p",null,"Although you can use ",Object(r.b)("inlineCode",{parentName:"p"},"EntityManager")," directly, much more convenient way is to use\n",Object(r.b)("a",Object(i.a)({parentName:"p"},{href:"https://mikro-orm.io/repositories/"}),Object(r.b)("inlineCode",{parentName:"a"},"EntityRepository")," instead"),". You can register\nyour repositories in dependency injection container like ",Object(r.b)("a",Object(i.a)({parentName:"p"},{href:"http://inversify.io/"}),"InversifyJS"),"\nso you do not need to get them from ",Object(r.b)("inlineCode",{parentName:"p"},"EntityManager")," each time."),Object(r.b)("p",null,"For more examples, take a look at\n",Object(r.b)("a",Object(i.a)({parentName:"p"},{href:"https://github.com/mikro-orm/mikro-orm/blob/master/tests/EntityManager.mongo.test.ts"}),Object(r.b)("inlineCode",{parentName:"a"},"tests/EntityManager.mongo.test.ts")),"\nor ",Object(r.b)("a",Object(i.a)({parentName:"p"},{href:"https://github.com/mikro-orm/mikro-orm/blob/master/tests/EntityManager.mysql.test.ts"}),Object(r.b)("inlineCode",{parentName:"a"},"tests/EntityManager.mysql.test.ts")),"."),Object(r.b)("h2",{id:"entitymanager-api"},"EntityManager API"),Object(r.b)("h4",{id:"getrepositoryt-extends-anyentityentityname-string--entityclasst-entityrepositoryt"},Object(r.b)("inlineCode",{parentName:"h4"},"getRepository<T extends AnyEntity>(entityName: string | EntityClass<T>): EntityRepository<T>")),Object(r.b)("p",null,"Returns ",Object(r.b)("inlineCode",{parentName:"p"},"EntityRepository")," for given entity, respects ",Object(r.b)("inlineCode",{parentName:"p"},"customRepository")," option of ",Object(r.b)("inlineCode",{parentName:"p"},"@Entity"),"\nand ",Object(r.b)("inlineCode",{parentName:"p"},"entityRepository")," option of ",Object(r.b)("inlineCode",{parentName:"p"},"MikroORM.init()"),"."),Object(r.b)("h4",{id:"findt-extends-anyentityentityname-string--entityclasst-where-filterqueryt-options-findoptions-promiset"},Object(r.b)("inlineCode",{parentName:"h4"},"find<T extends AnyEntity>(entityName: string | EntityClass<T>, where: FilterQuery<T>, options?: FindOptions): Promise<T[]>")),Object(r.b)("p",null,"Returns array of entities found for given condition. You can specify ",Object(r.b)("inlineCode",{parentName:"p"},"FindOptions")," to request\npopulation of referenced entities or control the pagination:"),Object(r.b)("pre",null,Object(r.b)("code",Object(i.a)({parentName:"pre"},{className:"language-typescript"}),"export interface FindOptions {\n  populate?: string[];\n  orderBy?: { [k: string]: QueryOrder };\n  limit?: number;\n  offset?: number;\n  schema?: string;\n}\n")),Object(r.b)("hr",null),Object(r.b)("h4",{id:"findt-extends-anyentityentityname-string--entityclasst-where-filterqueryt-populate-string-orderby--k-string-queryorder--limit-number-offset-number-promiset"},Object(r.b)("inlineCode",{parentName:"h4"},"find<T extends AnyEntity>(entityName: string | EntityClass<T>, where: FilterQuery<T>, populate?: string[], orderBy?: { [k: string]: QueryOrder }, limit?: number, offset?: number): Promise<T[]>")),Object(r.b)("p",null,"Same as previous ",Object(r.b)("inlineCode",{parentName:"p"},"find")," method, just with dedicated parameters for ",Object(r.b)("inlineCode",{parentName:"p"},"populate"),", ",Object(r.b)("inlineCode",{parentName:"p"},"orderBy"),", ",Object(r.b)("inlineCode",{parentName:"p"},"limit"),"\nand ",Object(r.b)("inlineCode",{parentName:"p"},"offset"),"."),Object(r.b)("hr",null),Object(r.b)("h4",{id:"findandcountt-extends-anyentityentityname-string--entityclasst-where-filterqueryt-populate-string-orderby--k-string-queryorder--limit-number-offset-number-promiset-number"},Object(r.b)("inlineCode",{parentName:"h4"},"findAndCount<T extends AnyEntity>(entityName: string | EntityClass<T>, where: FilterQuery<T>, populate?: string[], orderBy?: { [k: string]: QueryOrder }, limit?: number, offset?: number): Promise<[T[], number]>")),Object(r.b)("p",null,"Combination of ",Object(r.b)("inlineCode",{parentName:"p"},"find")," and ",Object(r.b)("inlineCode",{parentName:"p"},"count")," methods. "),Object(r.b)("hr",null),Object(r.b)("h4",{id:"findonet-extends-anyentityentityname-string--entityclasst-where-filterqueryt--iprimarykey-populate-string-promiset--null"},Object(r.b)("inlineCode",{parentName:"h4"},"findOne<T extends AnyEntity>(entityName: string | EntityClass<T>, where: FilterQuery<T> | IPrimaryKey, populate?: string[]): Promise<T | null>")),Object(r.b)("p",null,"Finds an entity by given ",Object(r.b)("inlineCode",{parentName:"p"},"where")," condition. You can use primary key as ",Object(r.b)("inlineCode",{parentName:"p"},"where")," value, then\nif the entity is already managed, no database call will be made. "),Object(r.b)("hr",null),Object(r.b)("h4",{id:"findoneorfailt-extends-anyentityentityname-string--entityclasst-where-filterqueryt--iprimarykey-populate-string-promiset"},Object(r.b)("inlineCode",{parentName:"h4"},"findOneOrFail<T extends AnyEntity>(entityName: string | EntityClass<T>, where: FilterQuery<T> | IPrimaryKey, populate?: string[]): Promise<T>")),Object(r.b)("p",null,"Just like ",Object(r.b)("inlineCode",{parentName:"p"},"findOne"),", but throws when entity not found, so it always resolves to given entity.\nYou can customize the error either globally via ",Object(r.b)("inlineCode",{parentName:"p"},"findOneOrFailHandler")," option, or locally via\n",Object(r.b)("inlineCode",{parentName:"p"},"failHandler")," option in ",Object(r.b)("inlineCode",{parentName:"p"},"findOneOrFail")," call."),Object(r.b)("hr",null),Object(r.b)("h4",{id:"merget-extends-anyentityentityname-string--entityclasst-data-entitydatat-t"},Object(r.b)("inlineCode",{parentName:"h4"},"merge<T extends AnyEntity>(entityName: string | EntityClass<T>, data: EntityData<T>): T")),Object(r.b)("p",null,"Adds given entity to current Identity Map. After merging, entity becomes managed.\nThis is useful when you want to work with cached entities. "),Object(r.b)("hr",null),Object(r.b)("h4",{id:"mapt-extends-anyentityentityname-string--entityclasst-data-entitydatat-t"},Object(r.b)("inlineCode",{parentName:"h4"},"map<T extends AnyEntity>(entityName: string | EntityClass<T>, data: EntityData<T>): T")),Object(r.b)("p",null,"Maps raw DB result to entity, adding it to current Identity Map. Equivalent to\n",Object(r.b)("inlineCode",{parentName:"p"},"IDatabaseDriver.mapResult()")," followed by ",Object(r.b)("inlineCode",{parentName:"p"},"em.merge()"),"."),Object(r.b)("hr",null),Object(r.b)("h4",{id:"getreferencet-extends-anyentityentityname-string--entityclasst-id-string-t"},Object(r.b)("inlineCode",{parentName:"h4"},"getReference<T extends AnyEntity>(entityName: string | EntityClass<T>, id: string): T")),Object(r.b)("p",null,"Gets a reference to the entity identified by the given type and identifier without actually\nloading it, if the entity is not yet loaded."),Object(r.b)("hr",null),Object(r.b)("h4",{id:"countentityname-string--entityclasst-where-filterqueryt-promisenumber"},Object(r.b)("inlineCode",{parentName:"h4"},"count(entityName: string | EntityClass<T>, where?: FilterQuery<T>): Promise<number>")),Object(r.b)("p",null,"Gets count of entities matching the ",Object(r.b)("inlineCode",{parentName:"p"},"where")," condition. "),Object(r.b)("hr",null),Object(r.b)("h4",{id:"persistentity-anyentity--anyentity-entitymanager"},Object(r.b)("inlineCode",{parentName:"h4"},"persist(entity: AnyEntity | AnyEntity[]): EntityManager")),Object(r.b)("p",null,"Tells the EntityManager to make an instance managed and persistent. The entity will be\nentered into the database at or before transaction commit or as a result of the flush\noperation."),Object(r.b)("hr",null),Object(r.b)("h4",{id:"persistandflushentity-anyentity--anyentity-promisevoid"},Object(r.b)("inlineCode",{parentName:"h4"},"persistAndFlush(entity: AnyEntity | AnyEntity[]): Promise<void>")),Object(r.b)("p",null,"Shortcut for ",Object(r.b)("inlineCode",{parentName:"p"},"persist")," & ",Object(r.b)("inlineCode",{parentName:"p"},"flush"),". Same as ",Object(r.b)("inlineCode",{parentName:"p"},"em.persist(entity).flush()"),"."),Object(r.b)("hr",null),Object(r.b)("h4",{id:"persistlaterentity-anyentity--anyentity-void"},Object(r.b)("inlineCode",{parentName:"h4"},"persistLater(entity: AnyEntity | AnyEntity[]): void")),Object(r.b)("p",null,"Shortcut for just ",Object(r.b)("inlineCode",{parentName:"p"},"persist"),", without flushing. Deprecated, use ",Object(r.b)("inlineCode",{parentName:"p"},"em.persist()"),"."),Object(r.b)("hr",null),Object(r.b)("h4",{id:"flush-promisevoid"},Object(r.b)("inlineCode",{parentName:"h4"},"flush(): Promise<void>")),Object(r.b)("p",null,"Flushes all changes to objects that have been queued up to now to the database."),Object(r.b)("hr",null),Object(r.b)("h4",{id:"removeentity-anyentity-entitymanager"},Object(r.b)("inlineCode",{parentName:"h4"},"remove(entity: AnyEntity): EntityManager")),Object(r.b)("p",null,"Removes an entity instance. A removed entity will be removed from the database at or before\ntransaction commit or as a result of the flush operation. "),Object(r.b)("p",null,"This method fires ",Object(r.b)("inlineCode",{parentName:"p"},"beforeDelete")," and ",Object(r.b)("inlineCode",{parentName:"p"},"afterDelete")," hooks.  "),Object(r.b)("hr",null),Object(r.b)("h4",{id:"removeandflushentity-anyentity-promisevoid"},Object(r.b)("inlineCode",{parentName:"h4"},"removeAndFlush(entity: AnyEntity): Promise<void>")),Object(r.b)("p",null,"Shortcut for ",Object(r.b)("inlineCode",{parentName:"p"},"remove")," & ",Object(r.b)("inlineCode",{parentName:"p"},"flush"),". Same as ",Object(r.b)("inlineCode",{parentName:"p"},"em.remove(entity).flush()"),"."),Object(r.b)("hr",null),Object(r.b)("h4",{id:"removelaterentity-anyentity-void"},Object(r.b)("inlineCode",{parentName:"h4"},"removeLater(entity: AnyEntity): void")),Object(r.b)("p",null,"Shortcut for ",Object(r.b)("inlineCode",{parentName:"p"},"remove")," without flushing. "),Object(r.b)("hr",null),Object(r.b)("h4",{id:"clear-void"},Object(r.b)("inlineCode",{parentName:"h4"},"clear(): void")),Object(r.b)("p",null,"Clears the EntityManager. All entities that are currently managed by this EntityManager\nbecome detached."),Object(r.b)("hr",null),Object(r.b)("h4",{id:"canpopulateentityname-string--entityclasst-property-string-boolean"},Object(r.b)("inlineCode",{parentName:"h4"},"canPopulate(entityName: string | EntityClass<T>, property: string): boolean")),Object(r.b)("p",null,"Returns whether given entity has given property which can be populated (is reference or\ncollection)."),Object(r.b)("hr",null))}b.isMDXComponent=!0},394:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return m}));var i=n(0),a=n.n(i);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=a.a.createContext({}),b=function(e){var t=a.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},p=function(e){var t=b(e.components);return a.a.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},u=a.a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,o=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),p=b(n),u=i,m=p["".concat(o,".").concat(u)]||p[u]||d[u]||r;return n?a.a.createElement(m,s(s({ref:t},c),{},{components:n})):a.a.createElement(m,s({ref:t},c))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,o=new Array(r);o[0]=u;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:i,o[1]=s;for(var c=2;c<r;c++)o[c]=n[c];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,n)}u.displayName="MDXCreateElement"}}]);