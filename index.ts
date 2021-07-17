import { appendClass } from "./injectors/ProgramInjector";
import _ from "lodash"
import { appendFunction } from "./injectors/ClassInjector";

const babel = require('@babel/core');
const { appendImport } = require('./injectors/ProgramInjector');

const transform = (input, opts: [{ actionName: string, code: string }]) => {
    return babel.transform(input, {
        plugins: [function ({ types, template }) {
            return {
                visitor: {
                    ClassDeclaration(path, state) {
                        appendFunction("function a() {}", { path, state, types })
                    },
                    Program(path, state) {
                        _.map(opts, (itm) => {
                            const { actionName, code } = itm;
                            switch (actionName) {
                                case "appendImport":
                                    appendImport(code, { path, state, types })
                                    break;
                                case "appendClass":
                                    appendClass(code, { path, state, types })
                                    break;
                            }
                        })
                    },
                },
            };
        }]
    })?.code;
}

function test() {
    // import a
    let result = transform("", [{
        actionName: "appendImport",
        code: `import a from "hello";`
    }]);

    result = transform(result, [{
        actionName: "appendImport",
        code: `import b from "bello";`
    }]);

    result = transform(result, [{
        actionName: "appendImport",
        code: `import c from "c";`
    }]);

    result = transform(result, [{
        actionName: "appendClass",
        code: `class B {}`
    }]);
    console.log(result);
}

test();