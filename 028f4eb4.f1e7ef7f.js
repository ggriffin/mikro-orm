(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{394:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return y}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=a.a.createContext({}),s=function(e){var t=a.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},u=function(e){var t=s(e.components);return a.a.createElement(c.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},b=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=s(n),b=r,y=u["".concat(i,".").concat(b)]||u[b]||m[b]||o;return n?a.a.createElement(y,p(p({ref:t},c),{},{components:n})):a.a.createElement(y,p({ref:t},c))}));function y(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=b;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p.mdxType="string"==typeof e?e:r,i[1]=p;for(var c=2;c<o;c++)i[c]=n[c];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"},60:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return p})),n.d(t,"rightToc",(function(){return l})),n.d(t,"default",(function(){return s}));var r=n(1),a=n(6),o=(n(0),n(394)),i={title:"Custom Types"},p={unversionedId:"custom-types",id:"version-3.3/custom-types",isDocsHomePage:!1,title:"Custom Types",description:"You can define custom types by extending Type abstract class. It has 4 optional methods:",source:"@site/versioned_docs/version-3.3/custom-types.md",slug:"/custom-types",permalink:"/docs/3.3/custom-types",editUrl:"https://github.com/mikro-orm/mikro-orm/edit/master/docs/versioned_docs/version-3.3/custom-types.md",version:"3.3",lastUpdatedBy:"Martin Adamek",lastUpdatedAt:1582616571,sidebar:"version-3.3/docs",previous:{title:"Naming Strategy",permalink:"/docs/3.3/naming-strategy"},next:{title:"Defining Entities via EntitySchema",permalink:"/docs/3.3/entity-schema"}},l=[],c={rightToc:l};function s(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"You can define custom types by extending ",Object(o.b)("inlineCode",{parentName:"p"},"Type")," abstract class. It has 4 optional methods:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},Object(o.b)("inlineCode",{parentName:"p"},"convertToDatabaseValue(value: any, platform: Platform): any")),Object(o.b)("p",{parentName:"li"},"Converts a value from its JS representation to its database representation of this type.\nBy default returns unchanged ",Object(o.b)("inlineCode",{parentName:"p"},"value"),".")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},Object(o.b)("inlineCode",{parentName:"p"},"convertToJSValue(value: any, platform: Platform): any")),Object(o.b)("p",{parentName:"li"},"Converts a value from its database representation to its JS representation of this type.\nBy default returns unchanged ",Object(o.b)("inlineCode",{parentName:"p"},"value"),".")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},Object(o.b)("inlineCode",{parentName:"p"},"toJSON(value: any, platform: Platform): any")),Object(o.b)("p",{parentName:"li"},"Converts a value from its JS representation to its serialized JSON form of this type.\nBy default converts to the database value.")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},Object(o.b)("inlineCode",{parentName:"p"},"getColumnType(prop: EntityProperty, platform: Platform): string")),Object(o.b)("p",{parentName:"li"},"Gets the SQL declaration snippet for a field of this type.\nBy default returns ",Object(o.b)("inlineCode",{parentName:"p"},"columnType")," of given property."))),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},Object(o.b)("inlineCode",{parentName:"p"},"DateType")," and ",Object(o.b)("inlineCode",{parentName:"p"},"TimeType")," types are already implemented in the ORM.")),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-typescript"}),"import { Type, Platform, EntityProperty, ValidationError } from 'mikro-orm';\n\nexport class DateType extends Type {\n\n  convertToDatabaseValue(value: any, platform: Platform): any {\n    if (value instanceof Date) {\n      return value.toISOString().substr(0, 10);\n    }\n\n    if (!value || value.toString().match(/^\\d{4}-\\d{2}-\\d{2}$/)) {\n      return value;\n    }\n\n    throw ValidationError.invalidType(DateType, value, 'JS');\n  }\n\n  convertToJSValue(value: any, platform: Platform): any {\n    if (!value || value instanceof Date) {\n      return value;\n    }\n\n    const date = new Date(value);\n\n    if (date.toString() === 'Invalid Date') {\n      throw ValidationError.invalidType(DateType, value, 'database');\n    }\n\n    return date;\n  }\n\n  getColumnType(prop: EntityProperty, platform: Platform) {\n    return `date(${prop.length})`;\n  }\n\n}\n")),Object(o.b)("p",null,"Then you can use this type when defining your entity properties:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-typescript"}),"@Entity()\nexport class FooBar implements IdEntity<FooBar> {\n\n  @PrimaryKey()\n  id!: number;\n\n  @Property()\n  name!: string;\n\n  @Property({ type: DateType, length: 3 })\n  born?: Date;\n\n}\n")))}s.isMDXComponent=!0}}]);