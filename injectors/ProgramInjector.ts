const _ = require("lodash");
import template from '@babel/template'
// Công cụ giúp thêm class

// Thêm import
export const appendImport = (content: string, opts: { path, state, types }) => {
    const myImport = template.ast(content, { sourceType: "module" })
    const lastImport = _.last(opts?.path.get("body").filter(p => p.isImportDeclaration()));
    if (lastImport) {
        // Trường hợp đã có các import trước đó
        lastImport.insertAfter(myImport);
    } else {
        // Chưa có bất kỳ import nào cả
        // mình sẽ insert vào đầu program
        opts?.path.node.body.unshift(myImport)
    }
}


export const appendClass = (content: string, opts: { path, state, types }) => {
    // Thêm một class vào
    const myImport = template.ast(content)
    const lastImport = _.last(opts?.path.get("body").filter(p => p.isClassBody()));
    if (lastImport) {
        // Trường hợp đã có các import trước đó
        lastImport.insertAfter(myImport);
    } else {
        // Chưa có bất kỳ import nào cả
        // mình sẽ insert vào sau import
        const lastImport = _.last(opts?.path.get("body").filter(p => p.isImportDeclaration()));
        if (lastImport) {
            lastImport.insertAfter(myImport);
        } else {
            opts?.path.node.body.push(myImport)
        }
    }
}