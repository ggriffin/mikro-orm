(window.webpackJsonp=window.webpackJsonp||[]).push([[84],{142:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return a})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return l})),n.d(t,"default",(function(){return u}));var r=n(1),o=n(6),i=(n(0),n(394)),a={title:"Using Query Builder"},c={unversionedId:"query-builder",id:"version-3.5/query-builder",isDocsHomePage:!1,title:"Using Query Builder",description:"When you need to execute some SQL query without all the ORM stuff involved, you can either",source:"@site/versioned_docs/version-3.5/query-builder.md",slug:"/query-builder",permalink:"/docs/3.5/query-builder",editUrl:"https://github.com/mikro-orm/mikro-orm/edit/master/docs/versioned_docs/version-3.5/query-builder.md",version:"3.5",lastUpdatedBy:"Martin Adamek",lastUpdatedAt:1584823432,sidebar:"version-3.5/docs",previous:{title:"Smart Query Conditions",permalink:"/docs/3.5/query-conditions"},next:{title:"Propagation",permalink:"/docs/3.5/propagation"}},l=[{value:"Using Knex.js",id:"using-knexjs",children:[]},{value:"Running Native SQL Query",id:"running-native-sql-query",children:[]},{value:"Executing the Query",id:"executing-the-query",children:[]},{value:"Mapping Raw Results to Entities",id:"mapping-raw-results-to-entities",children:[]},{value:"Implicit Joining",id:"implicit-joining",children:[]},{value:"Explicit Joining",id:"explicit-joining",children:[]},{value:"Complex Where Conditions",id:"complex-where-conditions",children:[{value:"Custom SQL in where",id:"custom-sql-in-where",children:[]},{value:"andWhere() and orWhere()",id:"andwhere-and-orwhere",children:[]},{value:"Conditions Object",id:"conditions-object",children:[]}]},{value:"Locking support",id:"locking-support",children:[]},{value:"QueryBuilder API",id:"querybuilder-api",children:[]}],s={rightToc:l};function u(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"When you need to execute some SQL query without all the ORM stuff involved, you can either\ncompose the query yourself, or use the ",Object(i.b)("inlineCode",{parentName:"p"},"QueryBuilder")," helper to construct the query for you:"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-typescript"}),"const qb = orm.em.createQueryBuilder(Author);\nqb.update({ name: 'test 123', type: PublisherType.GLOBAL }).where({ id: 123, type: PublisherType.LOCAL });\n\nconsole.log(qb.getQuery());\n// update `publisher2` set `name` = ?, `type` = ? where `id` = ? and `type` = ?\n\nconsole.log(qb.getParams());\n// ['test 123', PublisherType.GLOBAL, 123, PublisherType.LOCAL]\n\n// run the query\nconst res1 = await qb.execute();\n")),Object(i.b)("p",null,Object(i.b)("inlineCode",{parentName:"p"},"QueryBuilder")," also supports ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"/docs/3.5/query-conditions"}),"smart query conditions"),"."),Object(i.b)("h2",{id:"using-knexjs"},"Using Knex.js"),Object(i.b)("p",null,"Under the hood, ",Object(i.b)("inlineCode",{parentName:"p"},"QueryBuilder")," uses ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://knexjs.org"}),Object(i.b)("inlineCode",{parentName:"a"},"Knex.js"))," to compose and run queries.\nYou can access configured ",Object(i.b)("inlineCode",{parentName:"p"},"knex")," instance via ",Object(i.b)("inlineCode",{parentName:"p"},"qb.getKnexQuery()")," method:"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-typescript"}),"const qb = orm.em.createQueryBuilder(Author);\nqb.update({ name: 'test 123', type: PublisherType.GLOBAL }).where({ id: 123, type: PublisherType.LOCAL });\nconst knex = qb.getKnexQuery(); // instance of Knex' QueryBuilder\n\n// do what ever you need with `knex`\n\nconst res = await orm.em.getConnection().execute(knex);\nconst entities = res.map(a => orm.em.map(Author, a));\nconsole.log(entities); // Author[]\n")),Object(i.b)("p",null,"You can also get clear and configured knex instance from the connection via ",Object(i.b)("inlineCode",{parentName:"p"},"getKnex()")," method.\nAs this method is not available on the base ",Object(i.b)("inlineCode",{parentName:"p"},"Connection")," class, you will need to either manually\ntype cast the connection to ",Object(i.b)("inlineCode",{parentName:"p"},"AbstractSqlConnection")," (or the actual implementation you are using,\ne.g. ",Object(i.b)("inlineCode",{parentName:"p"},"MySqlConnection"),"), or provide correct driver type hint to your ",Object(i.b)("inlineCode",{parentName:"p"},"EntityManager")," instance,\nwhich will be then automatically inferred in ",Object(i.b)("inlineCode",{parentName:"p"},"em.getConnection()")," method."),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"Driver and connection implementations are not directly exported from ",Object(i.b)("inlineCode",{parentName:"p"},"mikro-orm")," module.\nYou can import them from ",Object(i.b)("inlineCode",{parentName:"p"},"mikro-orm/dist")," (e.g. ",Object(i.b)("inlineCode",{parentName:"p"},"import { PostgreSqlDriver } from 'mikro-orm/dist/drivers/PostgreSqlDriver'"),").")),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-typescript"}),"const conn = orm.em.getConnection() as AbstractSqlConnection;\n// you can make sure the `em` is correctly typed to `EntityManager<AbstractSqlDriver>`\n// or one of its implementations:\n// const em: EntityManager<AbstractSqlDriver> = orm.em;\n\nconst knex = conn.getKnex();\n\n// do what ever you need with `knex`\n\nconst res = await knex;\n")),Object(i.b)("h2",{id:"running-native-sql-query"},"Running Native SQL Query"),Object(i.b)("p",null,"You can run native SQL via underlying connection"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-typescript"}),"const connection = orm.em.getConnection();\nconst res = await connection.execute('select 1 as count');\nconsole.log(res); // res is array of objects: `[ { count: 1 } ]`\n")),Object(i.b)("h2",{id:"executing-the-query"},"Executing the Query"),Object(i.b)("p",null,"You can use ",Object(i.b)("inlineCode",{parentName:"p"},"execute(method = 'all', mapResults = true)"),"'s parameters to control form of result:"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-typescript"}),"const res1 = await qb.execute('all'); // returns array of objects, default behavior\nconst res2 = await qb.execute('get'); // returns single object\nconst res3 = await qb.execute('run'); // returns object like `{ affectedRows: number, insertId: number, row: any }`\n")),Object(i.b)("p",null,"Second argument can be used to disable mapping of database columns to property names (which\nis enabled by default). In following example, ",Object(i.b)("inlineCode",{parentName:"p"},"Book")," entity has ",Object(i.b)("inlineCode",{parentName:"p"},"createdAt")," property defined\nwith implicit underscored field name ",Object(i.b)("inlineCode",{parentName:"p"},"created_at"),":"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-typescript"}),"const res4 = await orm.em.createQueryBuilder(Book).select('*').execute('get', true);\nconsole.log(res4); // `createdAt` will be defined, while `created_at` will be missing\nconst res5 = await orm.em.createQueryBuilder(Book).select('*').execute('get', false);\nconsole.log(res5); // `created_at` will be defined, while `createdAt` will be missing\n")),Object(i.b)("p",null,"To get entity instances from the QueryBuilder result, you can use ",Object(i.b)("inlineCode",{parentName:"p"},"getResult()")," and ",Object(i.b)("inlineCode",{parentName:"p"},"getSingleResult()"),"\nmethods:"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-typescript"}),"const book = await orm.em.createQueryBuilder(Book).select('*').where({ id: 1 }).getSingleResult();\nconsole.log(book instanceof Book); // true\nconst books = await orm.em.createQueryBuilder(Book).select('*').getResult();\nconsole.log(books[0] instanceof Book); // true\n")),Object(i.b)("h2",{id:"mapping-raw-results-to-entities"},"Mapping Raw Results to Entities"),Object(i.b)("p",null,"Another way to create entity from raw results (that are not necessarily mapped to entity properties)\nis to use ",Object(i.b)("inlineCode",{parentName:"p"},"map()")," method of ",Object(i.b)("inlineCode",{parentName:"p"},"EntityManager"),", that is basically a shortcut for mapping results\nvia ",Object(i.b)("inlineCode",{parentName:"p"},"IDatabaseDriver.mapResult()")," (which converts field names to property names - e.g. ",Object(i.b)("inlineCode",{parentName:"p"},"created_at"),"\nto ",Object(i.b)("inlineCode",{parentName:"p"},"createdAt"),") and ",Object(i.b)("inlineCode",{parentName:"p"},"merge()")," which converts the data to entity instance and makes it managed. "),Object(i.b)("p",null,"This method comes handy when you want to use 3rd party query builders, where the result is not\nmapped to entity properties automatically:"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-typescript"}),"const results = await knex.select('*').from('users').where(knex.raw('id = ?', [id]));\nconst users = results.map(user => orm.em.map(User, user));\n\n// or use EntityRepository.map()\nconst repo = orm.em.getRepository(User);\nconst users = results.map(user => repo.map(user));\n")),Object(i.b)("h2",{id:"implicit-joining"},"Implicit Joining"),Object(i.b)("p",null,Object(i.b)("inlineCode",{parentName:"p"},"QueryBuilder")," supports automatic joining based on entity metadata:"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-typescript"}),"const qb = orm.em.createQueryBuilder(BookTag, 't');\nqb.select('*').where({ books: 123 });\n\nconsole.log(qb.getQuery());\n// select `t`.*, `e1`.`book_tag_id`, `e1`.`book_uuid_pk`\n// from `book_tag` as `t`\n// left join `book_to_book_tag` as `e1` ON `t`.`id` = `e1`.`book_tag_id`\n// where `e1`.`book_uuid_pk` = ?\n")),Object(i.b)("p",null,"This also works for multiple levels of nesting:"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-typescript"}),"const qb = orm.em.createQueryBuilder(Author);\nqb.select('*')\n  .where({ books: { tags: { name: 'Cool' } } })\n  .orderBy({ books: { tags: { createdBy: QueryOrder.DESC } } });\n\nconsole.log(qb.getQuery());\n// select `e0`.* \n// from `author` as `e0` \n// left join `book2` as `e1` on `e0`.`id` = `e1`.`author_id` \n// left join `book2_to_book_tag2` as `e3` on `e1`.`uuid_pk` = `e3`.`book2_uuid_pk` \n// left join `book_tag2` as `e2` on `e3`.`book_tag2_id` = `e2`.`id` \n// where `e2`.`name` = ? \n// order by `e1`.`tags` asc\n")),Object(i.b)("p",null,"This is currently available only for filtering (",Object(i.b)("inlineCode",{parentName:"p"},"where"),") and sorting (",Object(i.b)("inlineCode",{parentName:"p"},"orderBy"),"), only\nthe root entity will be selected. To populate its relationships, you can use ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"/docs/3.5/nested-populate"}),"EntityLoader"),"."),Object(i.b)("h2",{id:"explicit-joining"},"Explicit Joining"),Object(i.b)("p",null,"Another way is to manually specify join property via ",Object(i.b)("inlineCode",{parentName:"p"},"join()"),"/",Object(i.b)("inlineCode",{parentName:"p"},"leftJoin()")," methods:"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-typescript"}),"const qb = orm.em.createQueryBuilder(BookTag, 't');\nqb.select(['b.uuid', 'b.*', 't.*'], true)\n  .join('t.books', 'b')\n  .where({ 'b.title': 'test 123' })\n  .limit(2, 1);\n\nconsole.log(qb.getQuery());\n// select distinct `b`.`uuid_pk`, `b`.*, `t`.*, `e1`.`book_tag_id`, `e1`.`book_uuid_pk` from `book_tag` as `t`\n// join `book_to_book_tag` as `e1` ON `t`.`id` = `e1`.`book_tag_id`\n// join `book` as `b` ON `e1`.`book_uuid_pk` = `b`.`uuid_pk`\n// where `b`.`title` = ?\n// limit ? offset ?\n")),Object(i.b)("h2",{id:"complex-where-conditions"},"Complex Where Conditions"),Object(i.b)("p",null,"There are multiple ways to construct complex query conditions. You can either write parts of SQL\nmanually, use ",Object(i.b)("inlineCode",{parentName:"p"},"andWhere()"),"/",Object(i.b)("inlineCode",{parentName:"p"},"orWhere()"),", or provide condition object:"),Object(i.b)("h3",{id:"custom-sql-in-where"},"Custom SQL in where"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-typescript"}),"const qb = orm.em.createQueryBuilder(BookTag, 't');\nqb.select(['b.*', 't.*'])\n  .leftJoin('t.books', 'b')\n  .where('b.title = ? or b.title = ?', ['test 123', 'lol 321'])\n  .andWhere('1 = 1')\n  .orWhere('1 = 2')\n  .limit(2, 1);\n\nconsole.log(qb.getQuery());\n// select `b`.*, `t`.*, `e1`.`book_tag_id`, `e1`.`book_uuid_pk` from `book_tag` as `t`\n// left join `book_to_book_tag` as `e1` ON `t`.`id` = `e1`.`book_tag_id`\n// left join `book` as `b` ON `e1`.`book_uuid_pk` = `b`.`uuid_pk`\n// where (((b.title = ? or b.title = ?) and (1 = 1)) or (1 = 2))\n// limit ? offset ?\n")),Object(i.b)("h3",{id:"andwhere-and-orwhere"},"andWhere() and orWhere()"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-typescript"}),"const qb = orm.em.createQueryBuilder(BookTag, 't');\nqb.select(['b.*', 't.*'])\n  .leftJoin('t.books', 'b')\n  .where('b.title = ? or b.title = ?', ['test 123', 'lol 321'])\n  .andWhere('1 = 1')\n  .orWhere('1 = 2')\n  .limit(2, 1);\n\nconsole.log(qb.getQuery());\n// select `b`.*, `t`.*, `e1`.`book_tag_id`, `e1`.`book_uuid_pk` from `book_tag` as `t`\n// left join `book_to_book_tag` as `e1` ON `t`.`id` = `e1`.`book_tag_id`\n// left join `book` as `b` ON `e1`.`book_uuid_pk` = `b`.`uuid_pk`\n// where (((b.title = ? or b.title = ?) and (1 = 1)) or (1 = 2))\n// limit ? offset ?\n")),Object(i.b)("h3",{id:"conditions-object"},"Conditions Object"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-typescript"}),"const qb = orm.em.createQueryBuilder(Test);\nqb.select('*').where({ $and: [{ id: { $nin: [3, 4] } }, { id: { $gt: 2 } }] });\n\nconsole.log(qb.getQuery());\n// select `e0`.* from `test` as `e0` where (`e0`.`id` not in (?, ?) and `e0`.`id` > ?)\n")),Object(i.b)("h2",{id:"locking-support"},"Locking support"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-typescript"}),"const qb = orm.em.createQueryBuilder(Test);\nqb.select('*').where({ name: 'Lol 321' }).setLockMode(LockMode.PESSIMISTIC_READ);\n\nconsole.log(qb.getQuery()); // for MySQL\n// select `e0`.* from `test` as `e0` where `e0`.`name` = ? lock in share mode\n")),Object(i.b)("h2",{id:"querybuilder-api"},"QueryBuilder API"),Object(i.b)("p",null,Object(i.b)("inlineCode",{parentName:"p"},"QueryBuilder")," provides fluent interface with these methods:"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-typescript"}),"qb.select(fields: string | string[], distinct?: boolean): QueryBuilder;\nqb.addSelect(fields: string | string[]): QueryBuilder;\nqb.insert(data: Record<string, any>): QueryBuilder;\nqb.update(data: Record<string, any>): QueryBuilder;\nqb.delete(cond: Record<string, any>): QueryBuilder;\nqb.count(fields: string | string[], distinct?: boolean): QueryBuilder;\nqb.join(field: string, alias?: string): QueryBuilder;\nqb.leftJoin(field: string, alias?: string): QueryBuilder;\nqb.where(cond: Record<string, any>, operator?: '$and' | '$or'): QueryBuilder;\nqb.andWhere(cond: Record<string, any>): QueryBuilder;\nqb.orWhere(cond: Record<string, any>): QueryBuilder;\nqb.groupBy(fields: string | string[]): QueryBuilder;\nqb.having(cond: Record<string, any>): QueryBuilder;\nqb.limit(limit: number, offset?: number): QueryBuilder;\nqb.offset(offset: number): QueryBuilder;\nqb.withSchema(schema?: string): QueryBuilder;\nqb.execute<T>(method: 'all' | 'get' | 'run' = 'all', mapResults = true): T;\nqb.getResult<T>(): T[];\nqb.getSingleResult<T>(): T;\nqb.setLockMode(mode: LockMode): QueryBuilder;\nqb.getQuery(): string;\nqb.getParams(): any[];\nqb.clone(): QueryBuilder;\n")))}u.isMDXComponent=!0},394:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return m}));var r=n(0),o=n.n(r);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=o.a.createContext({}),u=function(e){var t=o.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},b=function(e){var t=u(e.components);return o.a.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},p=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,a=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),b=u(n),p=r,m=b["".concat(a,".").concat(p)]||b[p]||d[p]||i;return n?o.a.createElement(m,c(c({ref:t},s),{},{components:n})):o.a.createElement(m,c({ref:t},s))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,a=new Array(i);a[0]=p;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:r,a[1]=c;for(var s=2;s<i;s++)a[s]=n[s];return o.a.createElement.apply(null,a)}return o.a.createElement.apply(null,n)}p.displayName="MDXCreateElement"}}]);