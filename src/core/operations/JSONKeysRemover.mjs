/**
 * @author n1474335 [n1474335@gmail.com]
 * @author Phillip Nordwall [phillip.nordwall@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import JSON5 from "json5";
import OperationError from "../errors/OperationError.mjs";


/**
 * JSON Keys Remover operation
 */
class JSONKeysRemover extends Operation {

    /**
     * JSONBeautify constructor
     */
    constructor() {
        super();

        this.name = "JSON Keys Remover";
        this.module = "Code";
        this.description = "Indents and pretty prints JavaScript Object Notation (JSON) code.<br><br>Tags: json viewer, prettify, syntax highlighting";
        this.inputType = "string";
        this.outputType = "string";
        this.presentType = "html";
        this.args = [
            {
                name: "Keys to remove (comma separated list)",
                type: "string",
                value: ""
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        if (!input) return "";
        const [keysRawList] = args;

        const keys = keysRawList.split(",").map(key => key.trim());
        let output;
        try {
            output = JSON5.parse(input);
        } catch (err) {
            throw new OperationError("Unable to parse input as JSON.\n" + err);
        }

        keys.forEach(key => {
            if (key.endsWith("*")) {
                const prefix = key.slice(0, -1);
                Object.keys(output).forEach(k => {
                    if (k.startsWith(prefix)) {
                        delete output[k];
                    }
                });
            } else {
                delete output[key];
            }
        });

        return JSON.stringify(output);
    }
}

export default JSONKeysRemover;
