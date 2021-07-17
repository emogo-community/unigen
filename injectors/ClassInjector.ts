const _ = require("lodash");
import template from '@babel/template'

// Thêm 1 function vào class
export const appendFunction = (content: string, opts: { path, state, types }) => {
    // Thêm một class vào
    const _template = template.ast(content);
    opts?.path.node.body.push(_template);
}