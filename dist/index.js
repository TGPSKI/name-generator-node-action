/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 140:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issue = exports.issueCommand = void 0;
const os = __importStar(__nccwpck_require__(37));
const utils_1 = __nccwpck_require__(596);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 722:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getIDToken = exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.notice = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
const command_1 = __nccwpck_require__(140);
const file_command_1 = __nccwpck_require__(197);
const utils_1 = __nccwpck_require__(596);
const os = __importStar(__nccwpck_require__(37));
const path = __importStar(__nccwpck_require__(17));
const oidc_utils_1 = __nccwpck_require__(395);
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        return file_command_1.issueFileCommand('ENV', file_command_1.prepareKeyValueMessage(name, val));
    }
    command_1.issueCommand('set-env', { name }, convertedVal);
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueFileCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.
 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
 * Returns an empty string if the value is not defined.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    if (options && options.trimWhitespace === false) {
        return val;
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Gets the values of an multiline input.  Each value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string[]
 *
 */
function getMultilineInput(name, options) {
    const inputs = getInput(name, options)
        .split('\n')
        .filter(x => x !== '');
    if (options && options.trimWhitespace === false) {
        return inputs;
    }
    return inputs.map(input => input.trim());
}
exports.getMultilineInput = getMultilineInput;
/**
 * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
 * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
 * The return value is also in boolean type.
 * ref: https://yaml.org/spec/1.2/spec.html#id2804923
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   boolean
 */
function getBooleanInput(name, options) {
    const trueValue = ['true', 'True', 'TRUE'];
    const falseValue = ['false', 'False', 'FALSE'];
    const val = getInput(name, options);
    if (trueValue.includes(val))
        return true;
    if (falseValue.includes(val))
        return false;
    throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` +
        `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
}
exports.getBooleanInput = getBooleanInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    const filePath = process.env['GITHUB_OUTPUT'] || '';
    if (filePath) {
        return file_command_1.issueFileCommand('OUTPUT', file_command_1.prepareKeyValueMessage(name, value));
    }
    process.stdout.write(os.EOL);
    command_1.issueCommand('set-output', { name }, utils_1.toCommandValue(value));
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function error(message, properties = {}) {
    command_1.issueCommand('error', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds a warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function warning(message, properties = {}) {
    command_1.issueCommand('warning', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Adds a notice issue
 * @param message notice issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function notice(message, properties = {}) {
    command_1.issueCommand('notice', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.notice = notice;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    const filePath = process.env['GITHUB_STATE'] || '';
    if (filePath) {
        return file_command_1.issueFileCommand('STATE', file_command_1.prepareKeyValueMessage(name, value));
    }
    command_1.issueCommand('save-state', { name }, utils_1.toCommandValue(value));
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
function getIDToken(aud) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield oidc_utils_1.OidcClient.getIDToken(aud);
    });
}
exports.getIDToken = getIDToken;
/**
 * Summary exports
 */
var summary_1 = __nccwpck_require__(475);
Object.defineProperty(exports, "summary", ({ enumerable: true, get: function () { return summary_1.summary; } }));
/**
 * @deprecated use core.summary
 */
var summary_2 = __nccwpck_require__(475);
Object.defineProperty(exports, "markdownSummary", ({ enumerable: true, get: function () { return summary_2.markdownSummary; } }));
/**
 * Path exports
 */
var path_utils_1 = __nccwpck_require__(528);
Object.defineProperty(exports, "toPosixPath", ({ enumerable: true, get: function () { return path_utils_1.toPosixPath; } }));
Object.defineProperty(exports, "toWin32Path", ({ enumerable: true, get: function () { return path_utils_1.toWin32Path; } }));
Object.defineProperty(exports, "toPlatformPath", ({ enumerable: true, get: function () { return path_utils_1.toPlatformPath; } }));
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 197:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

// For internal use, subject to change.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.prepareKeyValueMessage = exports.issueFileCommand = void 0;
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__nccwpck_require__(147));
const os = __importStar(__nccwpck_require__(37));
const uuid_1 = __nccwpck_require__(650);
const utils_1 = __nccwpck_require__(596);
function issueFileCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueFileCommand = issueFileCommand;
function prepareKeyValueMessage(key, value) {
    const delimiter = `ghadelimiter_${uuid_1.v4()}`;
    const convertedValue = utils_1.toCommandValue(value);
    // These should realistically never happen, but just in case someone finds a
    // way to exploit uuid generation let's not allow keys or values that contain
    // the delimiter.
    if (key.includes(delimiter)) {
        throw new Error(`Unexpected input: name should not contain the delimiter "${delimiter}"`);
    }
    if (convertedValue.includes(delimiter)) {
        throw new Error(`Unexpected input: value should not contain the delimiter "${delimiter}"`);
    }
    return `${key}<<${delimiter}${os.EOL}${convertedValue}${os.EOL}${delimiter}`;
}
exports.prepareKeyValueMessage = prepareKeyValueMessage;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 395:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OidcClient = void 0;
const http_client_1 = __nccwpck_require__(774);
const auth_1 = __nccwpck_require__(187);
const core_1 = __nccwpck_require__(722);
class OidcClient {
    static createHttpClient(allowRetry = true, maxRetry = 10) {
        const requestOptions = {
            allowRetries: allowRetry,
            maxRetries: maxRetry
        };
        return new http_client_1.HttpClient('actions/oidc-client', [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())], requestOptions);
    }
    static getRequestToken() {
        const token = process.env['ACTIONS_ID_TOKEN_REQUEST_TOKEN'];
        if (!token) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable');
        }
        return token;
    }
    static getIDTokenUrl() {
        const runtimeUrl = process.env['ACTIONS_ID_TOKEN_REQUEST_URL'];
        if (!runtimeUrl) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable');
        }
        return runtimeUrl;
    }
    static getCall(id_token_url) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const httpclient = OidcClient.createHttpClient();
            const res = yield httpclient
                .getJson(id_token_url)
                .catch(error => {
                throw new Error(`Failed to get ID Token. \n 
        Error Code : ${error.statusCode}\n 
        Error Message: ${error.message}`);
            });
            const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
            if (!id_token) {
                throw new Error('Response json body do not have ID Token field');
            }
            return id_token;
        });
    }
    static getIDToken(audience) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // New ID Token is requested from action service
                let id_token_url = OidcClient.getIDTokenUrl();
                if (audience) {
                    const encodedAudience = encodeURIComponent(audience);
                    id_token_url = `${id_token_url}&audience=${encodedAudience}`;
                }
                core_1.debug(`ID token url is ${id_token_url}`);
                const id_token = yield OidcClient.getCall(id_token_url);
                core_1.setSecret(id_token);
                return id_token;
            }
            catch (error) {
                throw new Error(`Error message: ${error.message}`);
            }
        });
    }
}
exports.OidcClient = OidcClient;
//# sourceMappingURL=oidc-utils.js.map

/***/ }),

/***/ 528:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toPlatformPath = exports.toWin32Path = exports.toPosixPath = void 0;
const path = __importStar(__nccwpck_require__(17));
/**
 * toPosixPath converts the given path to the posix form. On Windows, \\ will be
 * replaced with /.
 *
 * @param pth. Path to transform.
 * @return string Posix path.
 */
function toPosixPath(pth) {
    return pth.replace(/[\\]/g, '/');
}
exports.toPosixPath = toPosixPath;
/**
 * toWin32Path converts the given path to the win32 form. On Linux, / will be
 * replaced with \\.
 *
 * @param pth. Path to transform.
 * @return string Win32 path.
 */
function toWin32Path(pth) {
    return pth.replace(/[/]/g, '\\');
}
exports.toWin32Path = toWin32Path;
/**
 * toPlatformPath converts the given path to a platform-specific path. It does
 * this by replacing instances of / and \ with the platform-specific path
 * separator.
 *
 * @param pth The path to platformize.
 * @return string The platform-specific path.
 */
function toPlatformPath(pth) {
    return pth.replace(/[/\\]/g, path.sep);
}
exports.toPlatformPath = toPlatformPath;
//# sourceMappingURL=path-utils.js.map

/***/ }),

/***/ 475:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.summary = exports.markdownSummary = exports.SUMMARY_DOCS_URL = exports.SUMMARY_ENV_VAR = void 0;
const os_1 = __nccwpck_require__(37);
const fs_1 = __nccwpck_require__(147);
const { access, appendFile, writeFile } = fs_1.promises;
exports.SUMMARY_ENV_VAR = 'GITHUB_STEP_SUMMARY';
exports.SUMMARY_DOCS_URL = 'https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary';
class Summary {
    constructor() {
        this._buffer = '';
    }
    /**
     * Finds the summary file path from the environment, rejects if env var is not found or file does not exist
     * Also checks r/w permissions.
     *
     * @returns step summary file path
     */
    filePath() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._filePath) {
                return this._filePath;
            }
            const pathFromEnv = process.env[exports.SUMMARY_ENV_VAR];
            if (!pathFromEnv) {
                throw new Error(`Unable to find environment variable for $${exports.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`);
            }
            try {
                yield access(pathFromEnv, fs_1.constants.R_OK | fs_1.constants.W_OK);
            }
            catch (_a) {
                throw new Error(`Unable to access summary file: '${pathFromEnv}'. Check if the file has correct read/write permissions.`);
            }
            this._filePath = pathFromEnv;
            return this._filePath;
        });
    }
    /**
     * Wraps content in an HTML tag, adding any HTML attributes
     *
     * @param {string} tag HTML tag to wrap
     * @param {string | null} content content within the tag
     * @param {[attribute: string]: string} attrs key-value list of HTML attributes to add
     *
     * @returns {string} content wrapped in HTML element
     */
    wrap(tag, content, attrs = {}) {
        const htmlAttrs = Object.entries(attrs)
            .map(([key, value]) => ` ${key}="${value}"`)
            .join('');
        if (!content) {
            return `<${tag}${htmlAttrs}>`;
        }
        return `<${tag}${htmlAttrs}>${content}</${tag}>`;
    }
    /**
     * Writes text in the buffer to the summary buffer file and empties buffer. Will append by default.
     *
     * @param {SummaryWriteOptions} [options] (optional) options for write operation
     *
     * @returns {Promise<Summary>} summary instance
     */
    write(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const overwrite = !!(options === null || options === void 0 ? void 0 : options.overwrite);
            const filePath = yield this.filePath();
            const writeFunc = overwrite ? writeFile : appendFile;
            yield writeFunc(filePath, this._buffer, { encoding: 'utf8' });
            return this.emptyBuffer();
        });
    }
    /**
     * Clears the summary buffer and wipes the summary file
     *
     * @returns {Summary} summary instance
     */
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.emptyBuffer().write({ overwrite: true });
        });
    }
    /**
     * Returns the current summary buffer as a string
     *
     * @returns {string} string of summary buffer
     */
    stringify() {
        return this._buffer;
    }
    /**
     * If the summary buffer is empty
     *
     * @returns {boolen} true if the buffer is empty
     */
    isEmptyBuffer() {
        return this._buffer.length === 0;
    }
    /**
     * Resets the summary buffer without writing to summary file
     *
     * @returns {Summary} summary instance
     */
    emptyBuffer() {
        this._buffer = '';
        return this;
    }
    /**
     * Adds raw text to the summary buffer
     *
     * @param {string} text content to add
     * @param {boolean} [addEOL=false] (optional) append an EOL to the raw text (default: false)
     *
     * @returns {Summary} summary instance
     */
    addRaw(text, addEOL = false) {
        this._buffer += text;
        return addEOL ? this.addEOL() : this;
    }
    /**
     * Adds the operating system-specific end-of-line marker to the buffer
     *
     * @returns {Summary} summary instance
     */
    addEOL() {
        return this.addRaw(os_1.EOL);
    }
    /**
     * Adds an HTML codeblock to the summary buffer
     *
     * @param {string} code content to render within fenced code block
     * @param {string} lang (optional) language to syntax highlight code
     *
     * @returns {Summary} summary instance
     */
    addCodeBlock(code, lang) {
        const attrs = Object.assign({}, (lang && { lang }));
        const element = this.wrap('pre', this.wrap('code', code), attrs);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML list to the summary buffer
     *
     * @param {string[]} items list of items to render
     * @param {boolean} [ordered=false] (optional) if the rendered list should be ordered or not (default: false)
     *
     * @returns {Summary} summary instance
     */
    addList(items, ordered = false) {
        const tag = ordered ? 'ol' : 'ul';
        const listItems = items.map(item => this.wrap('li', item)).join('');
        const element = this.wrap(tag, listItems);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML table to the summary buffer
     *
     * @param {SummaryTableCell[]} rows table rows
     *
     * @returns {Summary} summary instance
     */
    addTable(rows) {
        const tableBody = rows
            .map(row => {
            const cells = row
                .map(cell => {
                if (typeof cell === 'string') {
                    return this.wrap('td', cell);
                }
                const { header, data, colspan, rowspan } = cell;
                const tag = header ? 'th' : 'td';
                const attrs = Object.assign(Object.assign({}, (colspan && { colspan })), (rowspan && { rowspan }));
                return this.wrap(tag, data, attrs);
            })
                .join('');
            return this.wrap('tr', cells);
        })
            .join('');
        const element = this.wrap('table', tableBody);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds a collapsable HTML details element to the summary buffer
     *
     * @param {string} label text for the closed state
     * @param {string} content collapsable content
     *
     * @returns {Summary} summary instance
     */
    addDetails(label, content) {
        const element = this.wrap('details', this.wrap('summary', label) + content);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML image tag to the summary buffer
     *
     * @param {string} src path to the image you to embed
     * @param {string} alt text description of the image
     * @param {SummaryImageOptions} options (optional) addition image attributes
     *
     * @returns {Summary} summary instance
     */
    addImage(src, alt, options) {
        const { width, height } = options || {};
        const attrs = Object.assign(Object.assign({}, (width && { width })), (height && { height }));
        const element = this.wrap('img', null, Object.assign({ src, alt }, attrs));
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML section heading element
     *
     * @param {string} text heading text
     * @param {number | string} [level=1] (optional) the heading level, default: 1
     *
     * @returns {Summary} summary instance
     */
    addHeading(text, level) {
        const tag = `h${level}`;
        const allowedTag = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)
            ? tag
            : 'h1';
        const element = this.wrap(allowedTag, text);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML thematic break (<hr>) to the summary buffer
     *
     * @returns {Summary} summary instance
     */
    addSeparator() {
        const element = this.wrap('hr', null);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML line break (<br>) to the summary buffer
     *
     * @returns {Summary} summary instance
     */
    addBreak() {
        const element = this.wrap('br', null);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML blockquote to the summary buffer
     *
     * @param {string} text quote text
     * @param {string} cite (optional) citation url
     *
     * @returns {Summary} summary instance
     */
    addQuote(text, cite) {
        const attrs = Object.assign({}, (cite && { cite }));
        const element = this.wrap('blockquote', text, attrs);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML anchor tag to the summary buffer
     *
     * @param {string} text link text/content
     * @param {string} href hyperlink
     *
     * @returns {Summary} summary instance
     */
    addLink(text, href) {
        const element = this.wrap('a', text, { href });
        return this.addRaw(element).addEOL();
    }
}
const _summary = new Summary();
/**
 * @deprecated use `core.summary`
 */
exports.markdownSummary = _summary;
exports.summary = _summary;
//# sourceMappingURL=summary.js.map

/***/ }),

/***/ 596:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toCommandProperties = exports.toCommandValue = void 0;
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
/**
 *
 * @param annotationProperties
 * @returns The command properties to send with the actual annotation command
 * See IssueCommandProperties: https://github.com/actions/runner/blob/main/src/Runner.Worker/ActionCommandManager.cs#L646
 */
function toCommandProperties(annotationProperties) {
    if (!Object.keys(annotationProperties).length) {
        return {};
    }
    return {
        title: annotationProperties.title,
        file: annotationProperties.file,
        line: annotationProperties.startLine,
        endLine: annotationProperties.endLine,
        col: annotationProperties.startColumn,
        endColumn: annotationProperties.endColumn
    };
}
exports.toCommandProperties = toCommandProperties;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 187:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PersonalAccessTokenCredentialHandler = exports.BearerCredentialHandler = exports.BasicCredentialHandler = void 0;
class BasicCredentialHandler {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    prepareRequest(options) {
        if (!options.headers) {
            throw Error('The request has no headers');
        }
        options.headers['Authorization'] = `Basic ${Buffer.from(`${this.username}:${this.password}`).toString('base64')}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
}
exports.BasicCredentialHandler = BasicCredentialHandler;
class BearerCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        if (!options.headers) {
            throw Error('The request has no headers');
        }
        options.headers['Authorization'] = `Bearer ${this.token}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
}
exports.BearerCredentialHandler = BearerCredentialHandler;
class PersonalAccessTokenCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        if (!options.headers) {
            throw Error('The request has no headers');
        }
        options.headers['Authorization'] = `Basic ${Buffer.from(`PAT:${this.token}`).toString('base64')}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
}
exports.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;
//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 774:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpClient = exports.isHttps = exports.HttpClientResponse = exports.HttpClientError = exports.getProxyUrl = exports.MediaTypes = exports.Headers = exports.HttpCodes = void 0;
const http = __importStar(__nccwpck_require__(685));
const https = __importStar(__nccwpck_require__(687));
const pm = __importStar(__nccwpck_require__(883));
const tunnel = __importStar(__nccwpck_require__(866));
var HttpCodes;
(function (HttpCodes) {
    HttpCodes[HttpCodes["OK"] = 200] = "OK";
    HttpCodes[HttpCodes["MultipleChoices"] = 300] = "MultipleChoices";
    HttpCodes[HttpCodes["MovedPermanently"] = 301] = "MovedPermanently";
    HttpCodes[HttpCodes["ResourceMoved"] = 302] = "ResourceMoved";
    HttpCodes[HttpCodes["SeeOther"] = 303] = "SeeOther";
    HttpCodes[HttpCodes["NotModified"] = 304] = "NotModified";
    HttpCodes[HttpCodes["UseProxy"] = 305] = "UseProxy";
    HttpCodes[HttpCodes["SwitchProxy"] = 306] = "SwitchProxy";
    HttpCodes[HttpCodes["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpCodes[HttpCodes["PermanentRedirect"] = 308] = "PermanentRedirect";
    HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
    HttpCodes[HttpCodes["Unauthorized"] = 401] = "Unauthorized";
    HttpCodes[HttpCodes["PaymentRequired"] = 402] = "PaymentRequired";
    HttpCodes[HttpCodes["Forbidden"] = 403] = "Forbidden";
    HttpCodes[HttpCodes["NotFound"] = 404] = "NotFound";
    HttpCodes[HttpCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpCodes[HttpCodes["NotAcceptable"] = 406] = "NotAcceptable";
    HttpCodes[HttpCodes["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpCodes[HttpCodes["RequestTimeout"] = 408] = "RequestTimeout";
    HttpCodes[HttpCodes["Conflict"] = 409] = "Conflict";
    HttpCodes[HttpCodes["Gone"] = 410] = "Gone";
    HttpCodes[HttpCodes["TooManyRequests"] = 429] = "TooManyRequests";
    HttpCodes[HttpCodes["InternalServerError"] = 500] = "InternalServerError";
    HttpCodes[HttpCodes["NotImplemented"] = 501] = "NotImplemented";
    HttpCodes[HttpCodes["BadGateway"] = 502] = "BadGateway";
    HttpCodes[HttpCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpCodes[HttpCodes["GatewayTimeout"] = 504] = "GatewayTimeout";
})(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
var Headers;
(function (Headers) {
    Headers["Accept"] = "accept";
    Headers["ContentType"] = "content-type";
})(Headers = exports.Headers || (exports.Headers = {}));
var MediaTypes;
(function (MediaTypes) {
    MediaTypes["ApplicationJson"] = "application/json";
})(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
/**
 * Returns the proxy URL, depending upon the supplied url and proxy environment variables.
 * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
 */
function getProxyUrl(serverUrl) {
    const proxyUrl = pm.getProxyUrl(new URL(serverUrl));
    return proxyUrl ? proxyUrl.href : '';
}
exports.getProxyUrl = getProxyUrl;
const HttpRedirectCodes = [
    HttpCodes.MovedPermanently,
    HttpCodes.ResourceMoved,
    HttpCodes.SeeOther,
    HttpCodes.TemporaryRedirect,
    HttpCodes.PermanentRedirect
];
const HttpResponseRetryCodes = [
    HttpCodes.BadGateway,
    HttpCodes.ServiceUnavailable,
    HttpCodes.GatewayTimeout
];
const RetryableHttpVerbs = ['OPTIONS', 'GET', 'DELETE', 'HEAD'];
const ExponentialBackoffCeiling = 10;
const ExponentialBackoffTimeSlice = 5;
class HttpClientError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'HttpClientError';
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, HttpClientError.prototype);
    }
}
exports.HttpClientError = HttpClientError;
class HttpClientResponse {
    constructor(message) {
        this.message = message;
    }
    readBody() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                let output = Buffer.alloc(0);
                this.message.on('data', (chunk) => {
                    output = Buffer.concat([output, chunk]);
                });
                this.message.on('end', () => {
                    resolve(output.toString());
                });
            }));
        });
    }
    readBodyBuffer() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                const chunks = [];
                this.message.on('data', (chunk) => {
                    chunks.push(chunk);
                });
                this.message.on('end', () => {
                    resolve(Buffer.concat(chunks));
                });
            }));
        });
    }
}
exports.HttpClientResponse = HttpClientResponse;
function isHttps(requestUrl) {
    const parsedUrl = new URL(requestUrl);
    return parsedUrl.protocol === 'https:';
}
exports.isHttps = isHttps;
class HttpClient {
    constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
            if (requestOptions.ignoreSslError != null) {
                this._ignoreSslError = requestOptions.ignoreSslError;
            }
            this._socketTimeout = requestOptions.socketTimeout;
            if (requestOptions.allowRedirects != null) {
                this._allowRedirects = requestOptions.allowRedirects;
            }
            if (requestOptions.allowRedirectDowngrade != null) {
                this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
            }
            if (requestOptions.maxRedirects != null) {
                this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
            }
            if (requestOptions.keepAlive != null) {
                this._keepAlive = requestOptions.keepAlive;
            }
            if (requestOptions.allowRetries != null) {
                this._allowRetries = requestOptions.allowRetries;
            }
            if (requestOptions.maxRetries != null) {
                this._maxRetries = requestOptions.maxRetries;
            }
        }
    }
    options(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('OPTIONS', requestUrl, null, additionalHeaders || {});
        });
    }
    get(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('GET', requestUrl, null, additionalHeaders || {});
        });
    }
    del(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('DELETE', requestUrl, null, additionalHeaders || {});
        });
    }
    post(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('POST', requestUrl, data, additionalHeaders || {});
        });
    }
    patch(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('PATCH', requestUrl, data, additionalHeaders || {});
        });
    }
    put(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('PUT', requestUrl, data, additionalHeaders || {});
        });
    }
    head(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('HEAD', requestUrl, null, additionalHeaders || {});
        });
    }
    sendStream(verb, requestUrl, stream, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request(verb, requestUrl, stream, additionalHeaders);
        });
    }
    /**
     * Gets a typed object from an endpoint
     * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
     */
    getJson(requestUrl, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
            const res = yield this.get(requestUrl, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    postJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify(obj, null, 2);
            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
            additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
            const res = yield this.post(requestUrl, data, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    putJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify(obj, null, 2);
            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
            additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
            const res = yield this.put(requestUrl, data, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    patchJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify(obj, null, 2);
            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
            additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
            const res = yield this.patch(requestUrl, data, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    /**
     * Makes a raw http request.
     * All other methods such as get, post, patch, and request ultimately call this.
     * Prefer get, del, post and patch
     */
    request(verb, requestUrl, data, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._disposed) {
                throw new Error('Client has already been disposed.');
            }
            const parsedUrl = new URL(requestUrl);
            let info = this._prepareRequest(verb, parsedUrl, headers);
            // Only perform retries on reads since writes may not be idempotent.
            const maxTries = this._allowRetries && RetryableHttpVerbs.includes(verb)
                ? this._maxRetries + 1
                : 1;
            let numTries = 0;
            let response;
            do {
                response = yield this.requestRaw(info, data);
                // Check if it's an authentication challenge
                if (response &&
                    response.message &&
                    response.message.statusCode === HttpCodes.Unauthorized) {
                    let authenticationHandler;
                    for (const handler of this.handlers) {
                        if (handler.canHandleAuthentication(response)) {
                            authenticationHandler = handler;
                            break;
                        }
                    }
                    if (authenticationHandler) {
                        return authenticationHandler.handleAuthentication(this, info, data);
                    }
                    else {
                        // We have received an unauthorized response but have no handlers to handle it.
                        // Let the response return to the caller.
                        return response;
                    }
                }
                let redirectsRemaining = this._maxRedirects;
                while (response.message.statusCode &&
                    HttpRedirectCodes.includes(response.message.statusCode) &&
                    this._allowRedirects &&
                    redirectsRemaining > 0) {
                    const redirectUrl = response.message.headers['location'];
                    if (!redirectUrl) {
                        // if there's no location to redirect to, we won't
                        break;
                    }
                    const parsedRedirectUrl = new URL(redirectUrl);
                    if (parsedUrl.protocol === 'https:' &&
                        parsedUrl.protocol !== parsedRedirectUrl.protocol &&
                        !this._allowRedirectDowngrade) {
                        throw new Error('Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.');
                    }
                    // we need to finish reading the response before reassigning response
                    // which will leak the open socket.
                    yield response.readBody();
                    // strip authorization header if redirected to a different hostname
                    if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
                        for (const header in headers) {
                            // header names are case insensitive
                            if (header.toLowerCase() === 'authorization') {
                                delete headers[header];
                            }
                        }
                    }
                    // let's make the request with the new redirectUrl
                    info = this._prepareRequest(verb, parsedRedirectUrl, headers);
                    response = yield this.requestRaw(info, data);
                    redirectsRemaining--;
                }
                if (!response.message.statusCode ||
                    !HttpResponseRetryCodes.includes(response.message.statusCode)) {
                    // If not a retry code, return immediately instead of retrying
                    return response;
                }
                numTries += 1;
                if (numTries < maxTries) {
                    yield response.readBody();
                    yield this._performExponentialBackoff(numTries);
                }
            } while (numTries < maxTries);
            return response;
        });
    }
    /**
     * Needs to be called if keepAlive is set to true in request options.
     */
    dispose() {
        if (this._agent) {
            this._agent.destroy();
        }
        this._disposed = true;
    }
    /**
     * Raw request.
     * @param info
     * @param data
     */
    requestRaw(info, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                function callbackForResult(err, res) {
                    if (err) {
                        reject(err);
                    }
                    else if (!res) {
                        // If `err` is not passed, then `res` must be passed.
                        reject(new Error('Unknown error'));
                    }
                    else {
                        resolve(res);
                    }
                }
                this.requestRawWithCallback(info, data, callbackForResult);
            });
        });
    }
    /**
     * Raw request with callback.
     * @param info
     * @param data
     * @param onResult
     */
    requestRawWithCallback(info, data, onResult) {
        if (typeof data === 'string') {
            if (!info.options.headers) {
                info.options.headers = {};
            }
            info.options.headers['Content-Length'] = Buffer.byteLength(data, 'utf8');
        }
        let callbackCalled = false;
        function handleResult(err, res) {
            if (!callbackCalled) {
                callbackCalled = true;
                onResult(err, res);
            }
        }
        const req = info.httpModule.request(info.options, (msg) => {
            const res = new HttpClientResponse(msg);
            handleResult(undefined, res);
        });
        let socket;
        req.on('socket', sock => {
            socket = sock;
        });
        // If we ever get disconnected, we want the socket to timeout eventually
        req.setTimeout(this._socketTimeout || 3 * 60000, () => {
            if (socket) {
                socket.end();
            }
            handleResult(new Error(`Request timeout: ${info.options.path}`));
        });
        req.on('error', function (err) {
            // err has statusCode property
            // res should have headers
            handleResult(err);
        });
        if (data && typeof data === 'string') {
            req.write(data, 'utf8');
        }
        if (data && typeof data !== 'string') {
            data.on('close', function () {
                req.end();
            });
            data.pipe(req);
        }
        else {
            req.end();
        }
    }
    /**
     * Gets an http agent. This function is useful when you need an http agent that handles
     * routing through a proxy server - depending upon the url and proxy environment variables.
     * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
     */
    getAgent(serverUrl) {
        const parsedUrl = new URL(serverUrl);
        return this._getAgent(parsedUrl);
    }
    _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === 'https:';
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port
            ? parseInt(info.parsedUrl.port)
            : defaultPort;
        info.options.path =
            (info.parsedUrl.pathname || '') + (info.parsedUrl.search || '');
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
            info.options.headers['user-agent'] = this.userAgent;
        }
        info.options.agent = this._getAgent(info.parsedUrl);
        // gives handlers an opportunity to participate
        if (this.handlers) {
            for (const handler of this.handlers) {
                handler.prepareRequest(info.options);
            }
        }
        return info;
    }
    _mergeHeaders(headers) {
        if (this.requestOptions && this.requestOptions.headers) {
            return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers || {}));
        }
        return lowercaseKeys(headers || {});
    }
    _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        let clientHeader;
        if (this.requestOptions && this.requestOptions.headers) {
            clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
        }
        return additionalHeaders[header] || clientHeader || _default;
    }
    _getAgent(parsedUrl) {
        let agent;
        const proxyUrl = pm.getProxyUrl(parsedUrl);
        const useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) {
            agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
            agent = this._agent;
        }
        // if agent is already assigned use that agent.
        if (agent) {
            return agent;
        }
        const usingSsl = parsedUrl.protocol === 'https:';
        let maxSockets = 100;
        if (this.requestOptions) {
            maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        // This is `useProxy` again, but we need to check `proxyURl` directly for TypeScripts's flow analysis.
        if (proxyUrl && proxyUrl.hostname) {
            const agentOptions = {
                maxSockets,
                keepAlive: this._keepAlive,
                proxy: Object.assign(Object.assign({}, ((proxyUrl.username || proxyUrl.password) && {
                    proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
                })), { host: proxyUrl.hostname, port: proxyUrl.port })
            };
            let tunnelAgent;
            const overHttps = proxyUrl.protocol === 'https:';
            if (usingSsl) {
                tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
            }
            else {
                tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
            }
            agent = tunnelAgent(agentOptions);
            this._proxyAgent = agent;
        }
        // if reusing agent across request and tunneling agent isn't assigned create a new agent
        if (this._keepAlive && !agent) {
            const options = { keepAlive: this._keepAlive, maxSockets };
            agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
            this._agent = agent;
        }
        // if not using private agent and tunnel agent isn't setup then use global agent
        if (!agent) {
            agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
            // we don't want to set NODE_TLS_REJECT_UNAUTHORIZED=0 since that will affect request for entire process
            // http.RequestOptions doesn't expose a way to modify RequestOptions.agent.options
            // we have to cast it to any and change it directly
            agent.options = Object.assign(agent.options || {}, {
                rejectUnauthorized: false
            });
        }
        return agent;
    }
    _performExponentialBackoff(retryNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
            const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
            return new Promise(resolve => setTimeout(() => resolve(), ms));
        });
    }
    _processResponse(res, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const statusCode = res.message.statusCode || 0;
                const response = {
                    statusCode,
                    result: null,
                    headers: {}
                };
                // not found leads to null obj returned
                if (statusCode === HttpCodes.NotFound) {
                    resolve(response);
                }
                // get the result from the body
                function dateTimeDeserializer(key, value) {
                    if (typeof value === 'string') {
                        const a = new Date(value);
                        if (!isNaN(a.valueOf())) {
                            return a;
                        }
                    }
                    return value;
                }
                let obj;
                let contents;
                try {
                    contents = yield res.readBody();
                    if (contents && contents.length > 0) {
                        if (options && options.deserializeDates) {
                            obj = JSON.parse(contents, dateTimeDeserializer);
                        }
                        else {
                            obj = JSON.parse(contents);
                        }
                        response.result = obj;
                    }
                    response.headers = res.message.headers;
                }
                catch (err) {
                    // Invalid resource (contents not json);  leaving result obj null
                }
                // note that 3xx redirects are handled by the http layer.
                if (statusCode > 299) {
                    let msg;
                    // if exception/error in body, attempt to get better error
                    if (obj && obj.message) {
                        msg = obj.message;
                    }
                    else if (contents && contents.length > 0) {
                        // it may be the case that the exception is in the body message as string
                        msg = contents;
                    }
                    else {
                        msg = `Failed request: (${statusCode})`;
                    }
                    const err = new HttpClientError(msg, statusCode);
                    err.result = response.result;
                    reject(err);
                }
                else {
                    resolve(response);
                }
            }));
        });
    }
}
exports.HttpClient = HttpClient;
const lowercaseKeys = (obj) => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 883:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkBypass = exports.getProxyUrl = void 0;
function getProxyUrl(reqUrl) {
    const usingSsl = reqUrl.protocol === 'https:';
    if (checkBypass(reqUrl)) {
        return undefined;
    }
    const proxyVar = (() => {
        if (usingSsl) {
            return process.env['https_proxy'] || process.env['HTTPS_PROXY'];
        }
        else {
            return process.env['http_proxy'] || process.env['HTTP_PROXY'];
        }
    })();
    if (proxyVar) {
        try {
            return new URL(proxyVar);
        }
        catch (_a) {
            if (!proxyVar.startsWith('http://') && !proxyVar.startsWith('https://'))
                return new URL(`http://${proxyVar}`);
        }
    }
    else {
        return undefined;
    }
}
exports.getProxyUrl = getProxyUrl;
function checkBypass(reqUrl) {
    if (!reqUrl.hostname) {
        return false;
    }
    const reqHost = reqUrl.hostname;
    if (isLoopbackAddress(reqHost)) {
        return true;
    }
    const noProxy = process.env['no_proxy'] || process.env['NO_PROXY'] || '';
    if (!noProxy) {
        return false;
    }
    // Determine the request port
    let reqPort;
    if (reqUrl.port) {
        reqPort = Number(reqUrl.port);
    }
    else if (reqUrl.protocol === 'http:') {
        reqPort = 80;
    }
    else if (reqUrl.protocol === 'https:') {
        reqPort = 443;
    }
    // Format the request hostname and hostname with port
    const upperReqHosts = [reqUrl.hostname.toUpperCase()];
    if (typeof reqPort === 'number') {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
    }
    // Compare request host against noproxy
    for (const upperNoProxyItem of noProxy
        .split(',')
        .map(x => x.trim().toUpperCase())
        .filter(x => x)) {
        if (upperNoProxyItem === '*' ||
            upperReqHosts.some(x => x === upperNoProxyItem ||
                x.endsWith(`.${upperNoProxyItem}`) ||
                (upperNoProxyItem.startsWith('.') &&
                    x.endsWith(`${upperNoProxyItem}`)))) {
            return true;
        }
    }
    return false;
}
exports.checkBypass = checkBypass;
function isLoopbackAddress(host) {
    const hostLower = host.toLowerCase();
    return (hostLower === 'localhost' ||
        hostLower.startsWith('127.') ||
        hostLower.startsWith('[::1]') ||
        hostLower.startsWith('[0:0:0:0:0:0:0:1]'));
}
//# sourceMappingURL=proxy.js.map

/***/ }),

/***/ 866:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = __nccwpck_require__(908);


/***/ }),

/***/ 908:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var net = __nccwpck_require__(808);
var tls = __nccwpck_require__(404);
var http = __nccwpck_require__(685);
var https = __nccwpck_require__(687);
var events = __nccwpck_require__(361);
var assert = __nccwpck_require__(491);
var util = __nccwpck_require__(837);


exports.httpOverHttp = httpOverHttp;
exports.httpsOverHttp = httpsOverHttp;
exports.httpOverHttps = httpOverHttps;
exports.httpsOverHttps = httpsOverHttps;


function httpOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  return agent;
}

function httpsOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}

function httpOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  return agent;
}

function httpsOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}


function TunnelingAgent(options) {
  var self = this;
  self.options = options || {};
  self.proxyOptions = self.options.proxy || {};
  self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
  self.requests = [];
  self.sockets = [];

  self.on('free', function onFree(socket, host, port, localAddress) {
    var options = toOptions(host, port, localAddress);
    for (var i = 0, len = self.requests.length; i < len; ++i) {
      var pending = self.requests[i];
      if (pending.host === options.host && pending.port === options.port) {
        // Detect the request to connect same origin server,
        // reuse the connection.
        self.requests.splice(i, 1);
        pending.request.onSocket(socket);
        return;
      }
    }
    socket.destroy();
    self.removeSocket(socket);
  });
}
util.inherits(TunnelingAgent, events.EventEmitter);

TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
  var self = this;
  var options = mergeOptions({request: req}, self.options, toOptions(host, port, localAddress));

  if (self.sockets.length >= this.maxSockets) {
    // We are over limit so we'll add it to the queue.
    self.requests.push(options);
    return;
  }

  // If we are under maxSockets create a new one.
  self.createSocket(options, function(socket) {
    socket.on('free', onFree);
    socket.on('close', onCloseOrRemove);
    socket.on('agentRemove', onCloseOrRemove);
    req.onSocket(socket);

    function onFree() {
      self.emit('free', socket, options);
    }

    function onCloseOrRemove(err) {
      self.removeSocket(socket);
      socket.removeListener('free', onFree);
      socket.removeListener('close', onCloseOrRemove);
      socket.removeListener('agentRemove', onCloseOrRemove);
    }
  });
};

TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
  var self = this;
  var placeholder = {};
  self.sockets.push(placeholder);

  var connectOptions = mergeOptions({}, self.proxyOptions, {
    method: 'CONNECT',
    path: options.host + ':' + options.port,
    agent: false,
    headers: {
      host: options.host + ':' + options.port
    }
  });
  if (options.localAddress) {
    connectOptions.localAddress = options.localAddress;
  }
  if (connectOptions.proxyAuth) {
    connectOptions.headers = connectOptions.headers || {};
    connectOptions.headers['Proxy-Authorization'] = 'Basic ' +
        new Buffer(connectOptions.proxyAuth).toString('base64');
  }

  debug('making CONNECT request');
  var connectReq = self.request(connectOptions);
  connectReq.useChunkedEncodingByDefault = false; // for v0.6
  connectReq.once('response', onResponse); // for v0.6
  connectReq.once('upgrade', onUpgrade);   // for v0.6
  connectReq.once('connect', onConnect);   // for v0.7 or later
  connectReq.once('error', onError);
  connectReq.end();

  function onResponse(res) {
    // Very hacky. This is necessary to avoid http-parser leaks.
    res.upgrade = true;
  }

  function onUpgrade(res, socket, head) {
    // Hacky.
    process.nextTick(function() {
      onConnect(res, socket, head);
    });
  }

  function onConnect(res, socket, head) {
    connectReq.removeAllListeners();
    socket.removeAllListeners();

    if (res.statusCode !== 200) {
      debug('tunneling socket could not be established, statusCode=%d',
        res.statusCode);
      socket.destroy();
      var error = new Error('tunneling socket could not be established, ' +
        'statusCode=' + res.statusCode);
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    if (head.length > 0) {
      debug('got illegal response body from proxy');
      socket.destroy();
      var error = new Error('got illegal response body from proxy');
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    debug('tunneling connection has established');
    self.sockets[self.sockets.indexOf(placeholder)] = socket;
    return cb(socket);
  }

  function onError(cause) {
    connectReq.removeAllListeners();

    debug('tunneling socket could not be established, cause=%s\n',
          cause.message, cause.stack);
    var error = new Error('tunneling socket could not be established, ' +
                          'cause=' + cause.message);
    error.code = 'ECONNRESET';
    options.request.emit('error', error);
    self.removeSocket(placeholder);
  }
};

TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
  var pos = this.sockets.indexOf(socket)
  if (pos === -1) {
    return;
  }
  this.sockets.splice(pos, 1);

  var pending = this.requests.shift();
  if (pending) {
    // If we have pending requests and a socket gets closed a new one
    // needs to be created to take over in the pool for the one that closed.
    this.createSocket(pending, function(socket) {
      pending.request.onSocket(socket);
    });
  }
};

function createSecureSocket(options, cb) {
  var self = this;
  TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
    var hostHeader = options.request.getHeader('host');
    var tlsOptions = mergeOptions({}, self.options, {
      socket: socket,
      servername: hostHeader ? hostHeader.replace(/:.*$/, '') : options.host
    });

    // 0 is dummy port for v0.6
    var secureSocket = tls.connect(0, tlsOptions);
    self.sockets[self.sockets.indexOf(socket)] = secureSocket;
    cb(secureSocket);
  });
}


function toOptions(host, port, localAddress) {
  if (typeof host === 'string') { // since v0.10
    return {
      host: host,
      port: port,
      localAddress: localAddress
    };
  }
  return host; // for v0.11 or later
}

function mergeOptions(target) {
  for (var i = 1, len = arguments.length; i < len; ++i) {
    var overrides = arguments[i];
    if (typeof overrides === 'object') {
      var keys = Object.keys(overrides);
      for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
        var k = keys[j];
        if (overrides[k] !== undefined) {
          target[k] = overrides[k];
        }
      }
    }
  }
  return target;
}


var debug;
if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
  debug = function() {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] === 'string') {
      args[0] = 'TUNNEL: ' + args[0];
    } else {
      args.unshift('TUNNEL:');
    }
    console.error.apply(console, args);
  }
} else {
  debug = function() {};
}
exports.debug = debug; // for test


/***/ }),

/***/ 454:
/***/ ((__unused_webpack_module, exports) => {

const a=a=>{a=1831565813+(a|=0)|0;let e=Math.imul(a^a>>>15,1|a);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296};class e{constructor(a){this.dictionaries=void 0,this.length=void 0,this.separator=void 0,this.style=void 0,this.seed=void 0;const{length:e,separator:i,dictionaries:n,style:l,seed:r}=a;this.dictionaries=n,this.separator=i,this.length=e,this.style=l,this.seed=r}generate(){if(!this.dictionaries)throw new Error('Cannot find any dictionary. Please provide at least one, or leave the "dictionary" field empty in the config object');if(this.length<=0)throw new Error("Invalid length provided");if(this.length>this.dictionaries.length)throw new Error(`The length cannot be bigger than the number of dictionaries.\nLength provided: ${this.length}. Number of dictionaries provided: ${this.dictionaries.length}`);let e=this.seed;return this.dictionaries.slice(0,this.length).reduce((i,n)=>{let l;e?(l=(e=>{if("string"==typeof e){const i=e.split("").map(a=>a.charCodeAt(0)).reduce((a,e)=>a+e,1),n=Math.floor(Number(i));return a(n)}return a(e)})(e),e=4294967296*l):l=Math.random();let r=n[Math.floor(l*n.length)]||"";if("lowerCase"===this.style)r=r.toLowerCase();else if("capital"===this.style){const[a,...e]=r.split("");r=a.toUpperCase()+e.join("")}else"upperCase"===this.style&&(r=r.toUpperCase());return i?`${i}${this.separator}${r}`:`${r}`},"")}}const i={separator:"_",dictionaries:[]};exports.NumberDictionary=class{static generate(a={}){let e=a.min||1,i=a.max||999;if(a.length){const n=Math.pow(10,a.length);return e=n/10,i=n-1,[`${Math.floor(Math.random()*(i-e))+e}`]}return[`${Math.floor(Math.random()*(i-e))+e}`]}},exports.adjectives=["able","above","absent","absolute","abstract","abundant","academic","acceptable","accepted","accessible","accurate","accused","active","actual","acute","added","additional","adequate","adjacent","administrative","adorable","advanced","adverse","advisory","aesthetic","afraid","aggregate","aggressive","agreeable","agreed","agricultural","alert","alive","alleged","allied","alone","alright","alternative","amateur","amazing","ambitious","amused","ancient","angry","annoyed","annual","anonymous","anxious","appalling","apparent","applicable","appropriate","arbitrary","architectural","armed","arrogant","artificial","artistic","ashamed","asleep","assistant","associated","atomic","attractive","automatic","autonomous","available","average","awake","aware","awful","awkward","back","bad","balanced","bare","basic","beautiful","beneficial","better","bewildered","big","binding","biological","bitter","bizarre","blank","blind","blonde","bloody","blushing","boiling","bold","bored","boring","bottom","brainy","brave","breakable","breezy","brief","bright","brilliant","broad","broken","bumpy","burning","busy","calm","capable","capitalist","careful","casual","causal","cautious","central","certain","changing","characteristic","charming","cheap","cheerful","chemical","chief","chilly","chosen","christian","chronic","chubby","circular","civic","civil","civilian","classic","classical","clean","clear","clever","clinical","close","closed","cloudy","clumsy","coastal","cognitive","coherent","cold","collective","colonial","colorful","colossal","coloured","colourful","combative","combined","comfortable","coming","commercial","common","communist","compact","comparable","comparative","compatible","competent","competitive","complete","complex","complicated","comprehensive","compulsory","conceptual","concerned","concrete","condemned","confident","confidential","confused","conscious","conservation","conservative","considerable","consistent","constant","constitutional","contemporary","content","continental","continued","continuing","continuous","controlled","controversial","convenient","conventional","convinced","convincing","cooing","cool","cooperative","corporate","correct","corresponding","costly","courageous","crazy","creative","creepy","criminal","critical","crooked","crowded","crucial","crude","cruel","cuddly","cultural","curious","curly","current","curved","cute","daily","damaged","damp","dangerous","dark","dead","deaf","deafening","dear","decent","decisive","deep","defeated","defensive","defiant","definite","deliberate","delicate","delicious","delighted","delightful","democratic","dependent","depressed","desirable","desperate","detailed","determined","developed","developing","devoted","different","difficult","digital","diplomatic","direct","dirty","disabled","disappointed","disastrous","disciplinary","disgusted","distant","distinct","distinctive","distinguished","disturbed","disturbing","diverse","divine","dizzy","domestic","dominant","double","doubtful","drab","dramatic","dreadful","driving","drunk","dry","dual","due","dull","dusty","dutch","dying","dynamic","eager","early","eastern","easy","economic","educational","eerie","effective","efficient","elaborate","elated","elderly","eldest","electoral","electric","electrical","electronic","elegant","eligible","embarrassed","embarrassing","emotional","empirical","empty","enchanting","encouraging","endless","energetic","enormous","enthusiastic","entire","entitled","envious","environmental","equal","equivalent","essential","established","estimated","ethical","ethnic","eventual","everyday","evident","evil","evolutionary","exact","excellent","exceptional","excess","excessive","excited","exciting","exclusive","existing","exotic","expected","expensive","experienced","experimental","explicit","extended","extensive","external","extra","extraordinary","extreme","exuberant","faint","fair","faithful","familiar","famous","fancy","fantastic","far","fascinating","fashionable","fast","fat","fatal","favourable","favourite","federal","fellow","female","feminist","few","fierce","filthy","final","financial","fine","firm","fiscal","fit","fixed","flaky","flat","flexible","fluffy","fluttering","flying","following","fond","foolish","foreign","formal","formidable","forthcoming","fortunate","forward","fragile","frail","frantic","free","frequent","fresh","friendly","frightened","front","frozen","full","fun","functional","fundamental","funny","furious","future","fuzzy","gastric","gay","general","generous","genetic","gentle","genuine","geographical","giant","gigantic","given","glad","glamorous","gleaming","global","glorious","golden","good","gorgeous","gothic","governing","graceful","gradual","grand","grateful","greasy","great","grieving","grim","gross","grotesque","growing","grubby","grumpy","guilty","handicapped","handsome","happy","hard","harsh","head","healthy","heavy","helpful","helpless","hidden","high","hilarious","hissing","historic","historical","hollow","holy","homeless","homely","hon","honest","horizontal","horrible","hostile","hot","huge","human","hungry","hurt","hushed","husky","icy","ideal","identical","ideological","ill","illegal","imaginative","immediate","immense","imperial","implicit","important","impossible","impressed","impressive","improved","inadequate","inappropriate","inc","inclined","increased","increasing","incredible","independent","indirect","individual","industrial","inevitable","influential","informal","inherent","initial","injured","inland","inner","innocent","innovative","inquisitive","instant","institutional","insufficient","intact","integral","integrated","intellectual","intelligent","intense","intensive","interested","interesting","interim","interior","intermediate","internal","international","intimate","invisible","involved","irrelevant","isolated","itchy","jealous","jittery","joint","jolly","joyous","judicial","juicy","junior","just","keen","key","kind","known","labour","large","late","latin","lazy","leading","left","legal","legislative","legitimate","lengthy","lesser","level","lexical","liable","liberal","light","like","likely","limited","linear","linguistic","liquid","literary","little","live","lively","living","local","logical","lonely","long","loose","lost","loud","lovely","low","loyal","ltd","lucky","mad","magic","magnetic","magnificent","main","major","male","mammoth","managerial","managing","manual","many","marginal","marine","marked","married","marvellous","marxist","mass","massive","mathematical","mature","maximum","mean","meaningful","mechanical","medical","medieval","melodic","melted","mental","mere","metropolitan","mid","middle","mighty","mild","military","miniature","minimal","minimum","ministerial","minor","miserable","misleading","missing","misty","mixed","moaning","mobile","moderate","modern","modest","molecular","monetary","monthly","moral","motionless","muddy","multiple","mushy","musical","mute","mutual","mysterious","naked","narrow","nasty","national","native","natural","naughty","naval","near","nearby","neat","necessary","negative","neighbouring","nervous","net","neutral","new","nice","noble","noisy","normal","northern","nosy","notable","novel","nuclear","numerous","nursing","nutritious","nutty","obedient","objective","obliged","obnoxious","obvious","occasional","occupational","odd","official","ok","okay","old","olympic","only","open","operational","opposite","optimistic","oral","ordinary","organic","organisational","original","orthodox","other","outdoor","outer","outrageous","outside","outstanding","overall","overseas","overwhelming","painful","pale","panicky","parallel","parental","parliamentary","partial","particular","passing","passive","past","patient","payable","peaceful","peculiar","perfect","permanent","persistent","personal","petite","philosophical","physical","plain","planned","plastic","pleasant","pleased","poised","polite","political","poor","popular","positive","possible","potential","powerful","practical","precious","precise","preferred","pregnant","preliminary","premier","prepared","present","presidential","pretty","previous","prickly","primary","prime","primitive","principal","printed","prior","private","probable","productive","professional","profitable","profound","progressive","prominent","promising","proper","proposed","prospective","protective","protestant","proud","provincial","psychiatric","psychological","public","puny","pure","purring","puzzled","quaint","qualified","quarrelsome","querulous","quick","quickest","quiet","quintessential","quixotic","racial","radical","rainy","random","rapid","rare","raspy","rational","ratty","raw","ready","real","realistic","rear","reasonable","recent","reduced","redundant","regional","registered","regular","regulatory","related","relative","relaxed","relevant","reliable","relieved","religious","reluctant","remaining","remarkable","remote","renewed","representative","repulsive","required","resident","residential","resonant","respectable","respective","responsible","resulting","retail","retired","revolutionary","rich","ridiculous","right","rigid","ripe","rising","rival","roasted","robust","rolling","romantic","rotten","rough","round","royal","rubber","rude","ruling","running","rural","sacred","sad","safe","salty","satisfactory","satisfied","scared","scary","scattered","scientific","scornful","scrawny","screeching","secondary","secret","secure","select","selected","selective","selfish","semantic","senior","sensible","sensitive","separate","serious","severe","sexual","shaggy","shaky","shallow","shared","sharp","sheer","shiny","shivering","shocked","short","shrill","shy","sick","significant","silent","silky","silly","similar","simple","single","skilled","skinny","sleepy","slight","slim","slimy","slippery","slow","small","smart","smiling","smoggy","smooth","social","socialist","soft","solar","sole","solid","sophisticated","sore","sorry","sound","sour","southern","soviet","spare","sparkling","spatial","special","specific","specified","spectacular","spicy","spiritual","splendid","spontaneous","sporting","spotless","spotty","square","squealing","stable","stale","standard","static","statistical","statutory","steady","steep","sticky","stiff","still","stingy","stormy","straight","straightforward","strange","strategic","strict","striking","striped","strong","structural","stuck","stupid","subjective","subsequent","substantial","subtle","successful","successive","sudden","sufficient","suitable","sunny","super","superb","superior","supporting","supposed","supreme","sure","surprised","surprising","surrounding","surviving","suspicious","sweet","swift","symbolic","sympathetic","systematic","tall","tame","tart","tasteless","tasty","technical","technological","teenage","temporary","tender","tense","terrible","territorial","testy","then","theoretical","thick","thin","thirsty","thorough","thoughtful","thoughtless","thundering","tight","tiny","tired","top","tory","total","tough","toxic","traditional","tragic","tremendous","tricky","tropical","troubled","typical","ugliest","ugly","ultimate","unable","unacceptable","unaware","uncertain","unchanged","uncomfortable","unconscious","underground","underlying","unemployed","uneven","unexpected","unfair","unfortunate","unhappy","uniform","uninterested","unique","united","universal","unknown","unlikely","unnecessary","unpleasant","unsightly","unusual","unwilling","upper","upset","uptight","urban","urgent","used","useful","useless","usual","vague","valid","valuable","variable","varied","various","varying","vast","verbal","vertical","very","vicarious","vicious","victorious","violent","visible","visiting","visual","vital","vitreous","vivacious","vivid","vocal","vocational","voiceless","voluminous","voluntary","vulnerable","wandering","warm","wasteful","watery","weak","wealthy","weary","wee","weekly","weird","welcome","well","western","wet","whispering","whole","wicked","wide","widespread","wild","wilful","willing","willowy","wily","wise","wispy","wittering","witty","wonderful","wooden","working","worldwide","worried","worrying","worthwhile","worthy","written","wrong","xenacious","xenial","xenogeneic","xenophobic","xeric","xerothermic","yabbering","yammering","yappiest","yappy","yawning","yearling","yearning","yeasty","yelling","yelping","yielding","yodelling","young","youngest","youthful","ytterbic","yucky","yummy","zany","zealous","zeroth","zestful","zesty","zippy","zonal","zoophagous","zygomorphic","zygotic"],exports.animals=["aardvark","aardwolf","albatross","alligator","alpaca","amphibian","anaconda","angelfish","anglerfish","ant","anteater","antelope","antlion","ape","aphid","armadillo","asp","baboon","badger","bandicoot","barnacle","barracuda","basilisk","bass","bat","bear","beaver","bedbug","bee","beetle","bird","bison","blackbird","boa","boar","bobcat","bobolink","bonobo","booby","bovid","bug","butterfly","buzzard","camel","canid","canidae","capybara","cardinal","caribou","carp","cat","caterpillar","catfish","catshark","cattle","centipede","cephalopod","chameleon","cheetah","chickadee","chicken","chimpanzee","chinchilla","chipmunk","cicada","clam","clownfish","cobra","cockroach","cod","condor","constrictor","coral","cougar","cow","coyote","crab","crane","crawdad","crayfish","cricket","crocodile","crow","cuckoo","damselfly","deer","dingo","dinosaur","dog","dolphin","donkey","dormouse","dove","dragon","dragonfly","duck","eagle","earthworm","earwig","echidna","eel","egret","elephant","elk","emu","ermine","falcon","felidae","ferret","finch","firefly","fish","flamingo","flea","fly","flyingfish","fowl","fox","frog","galliform","gamefowl","gayal","gazelle","gecko","gerbil","gibbon","giraffe","goat","goldfish","goose","gopher","gorilla","grasshopper","grouse","guan","guanaco","guineafowl","gull","guppy","haddock","halibut","hamster","hare","harrier","hawk","hedgehog","heron","herring","hippopotamus","hookworm","hornet","horse","hoverfly","hummingbird","hyena","iguana","impala","jackal","jaguar","jay","jellyfish","junglefowl","kangaroo","kingfisher","kite","kiwi","koala","koi","krill","ladybug","lamprey","landfowl","lark","leech","lemming","lemur","leopard","leopon","limpet","lion","lizard","llama","lobster","locust","loon","louse","lungfish","lynx","macaw","mackerel","magpie","mammal","manatee","mandrill","marlin","marmoset","marmot","marsupial","marten","mastodon","meadowlark","meerkat","mink","minnow","mite","mockingbird","mole","mollusk","mongoose","monkey","moose","mosquito","moth","mouse","mule","muskox","narwhal","newt","nightingale","ocelot","octopus","opossum","orangutan","orca","ostrich","otter","owl","ox","panda","panther","parakeet","parrot","parrotfish","partridge","peacock","peafowl","pelican","penguin","perch","pheasant","pig","pigeon","pike","pinniped","piranha","planarian","platypus","pony","porcupine","porpoise","possum","prawn","primate","ptarmigan","puffin","puma","python","quail","quelea","quokka","rabbit","raccoon","rat","rattlesnake","raven","reindeer","reptile","rhinoceros","roadrunner","rodent","rook","rooster","roundworm","sailfish","salamander","salmon","sawfish","scallop","scorpion","seahorse","shark","sheep","shrew","shrimp","silkworm","silverfish","skink","skunk","sloth","slug","smelt","snail","snake","snipe","sole","sparrow","spider","spoonbill","squid","squirrel","starfish","stingray","stoat","stork","sturgeon","swallow","swan","swift","swordfish","swordtail","tahr","takin","tapir","tarantula","tarsier","termite","tern","thrush","tick","tiger","tiglon","toad","tortoise","toucan","trout","tuna","turkey","turtle","tyrannosaurus","unicorn","urial","vicuna","viper","vole","vulture","wallaby","walrus","warbler","wasp","weasel","whale","whippet","whitefish","wildcat","wildebeest","wildfowl","wolf","wolverine","wombat","woodpecker","worm","wren","xerinae","yak","zebra"],exports.colors=["amaranth","amber","amethyst","apricot","aqua","aquamarine","azure","beige","black","blue","blush","bronze","brown","chocolate","coffee","copper","coral","crimson","cyan","emerald","fuchsia","gold","gray","green","harlequin","indigo","ivory","jade","lavender","lime","magenta","maroon","moccasin","olive","orange","peach","pink","plum","purple","red","rose","salmon","sapphire","scarlet","silver","tan","teal","tomato","turquoise","violet","white","yellow"],exports.countries=["Afghanistan","Åland Islands","Albania","Algeria","American Samoa","Andorra","Angola","Anguilla","Antarctica","Antigua & Barbuda","Argentina","Armenia","Aruba","Ascension Island","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Indian Ocean Territory","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Canary Islands","Cape Verde","Caribbean Netherlands","Cayman Islands","Central African Republic","Ceuta & Melilla","Chad","Chile","China","Christmas Island","Cocos Islands","Colombia","Comoros","Congo","Cook Islands","Costa Rica","Côte d'Ivoire","Croatia","Cuba","Curaçao","Cyprus","Czechia","Denmark","Diego Garcia","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Eurozone","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Guiana","French Polynesia","French Southern Territories","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guadeloupe","Guam","Guatemala","Guernsey","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hong Kong SAR China","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau SAR China","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Niue","Norfolk Island","North Korea","Northern Mariana Islands","Norway","Oman","Pakistan","Palau","Palestinian Territories","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Pitcairn Islands","Poland","Portugal","Puerto Rico","Qatar","Réunion","Romania","Russia","Rwanda","Samoa","San Marino","São Tomé & Príncipe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Sint Maarten","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Georgia & South Sandwich Islands","South Korea","South Sudan","Spain","Sri Lanka","St. Barthélemy","St. Helena","St. Kitts & Nevis","St. Lucia","St. Martin","St. Pierre & Miquelon","St. Vincent & Grenadines","Sudan","Suriname","Svalbard & Jan Mayen","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tokelau","Tonga","Trinidad & Tobago","Tristan da Cunha","Tunisia","Turkey","Turkmenistan","Turks & Caicos Islands","Tuvalu","U.S. Outlying Islands","U.S. Virgin Islands","Uganda","Ukraine","United Arab Emirates","United Kingdom","United Nations","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Wallis & Futuna","Western Sahara","Yemen","Zambia","Zimbabwe"],exports.languages=["Akan","Amharic","Arabic","Assamese","Awadhi","Azerbaijani","Balochi","Belarusian","Bengali","Bhojpuri","Burmese","Cebuano","Chewa","Chhattisgarhi","Chittagonian","Czech","Deccan","Dhundhari","Dutch","English","French","Fula","Gan","German","Greek","Gujarati","Hakka","Haryanvi","Hausa","Hiligaynon","Hindi","Hmong","Hungarian","Igbo","Ilocano","Italian","Japanese","Javanese","Jin","Kannada","Kazakh","Khmer","Kinyarwanda","Kirundi","Konkani","Korean","Kurdish","Madurese","Magahi","Maithili","Malagasy","Malay","Malayalam","Mandarin","Marathi","Marwari","Min","Mossi","Nepali","Odia","Oromo","Pashto","Persian","Polish","Portuguese","Punjabi","Quechua","Romanian","Russian","Saraiki","Shona","Sindhi","Sinhala","Somali","Spanish","Sundanese","Swedish","Sylheti","Tagalog","Tamil","Telugu","Thai","Turkish","Turkmen","Ukrainian","Urdu","Uyghur","Uzbek","Vietnamese","Wu","Xhosa","Xiang","Yoruba","Yue","Zhuang","Zulu"],exports.names=["Aaren","Aarika","Abagael","Abagail","Abbe","Abbey","Abbi","Abbie","Abby","Abbye","Abigael","Abigail","Abigale","Abra","Ada","Adah","Adaline","Adan","Adara","Adda","Addi","Addia","Addie","Addy","Adel","Adela","Adelaida","Adelaide","Adele","Adelheid","Adelice","Adelina","Adelind","Adeline","Adella","Adelle","Adena","Adey","Adi","Adiana","Adina","Adora","Adore","Adoree","Adorne","Adrea","Adria","Adriaens","Adrian","Adriana","Adriane","Adrianna","Adrianne","Adriena","Adrienne","Aeriel","Aeriela","Aeriell","Afton","Ag","Agace","Agata","Agatha","Agathe","Aggi","Aggie","Aggy","Agna","Agnella","Agnes","Agnese","Agnesse","Agneta","Agnola","Agretha","Aida","Aidan","Aigneis","Aila","Aile","Ailee","Aileen","Ailene","Ailey","Aili","Ailina","Ailis","Ailsun","Ailyn","Aime","Aimee","Aimil","Aindrea","Ainslee","Ainsley","Ainslie","Ajay","Alaine","Alameda","Alana","Alanah","Alane","Alanna","Alayne","Alberta","Albertina","Albertine","Albina","Alecia","Aleda","Aleece","Aleen","Alejandra","Alejandrina","Alena","Alene","Alessandra","Aleta","Alethea","Alex","Alexa","Alexandra","Alexandrina","Alexi","Alexia","Alexina","Alexine","Alexis","Alfi","Alfie","Alfreda","Alfy","Ali","Alia","Alica","Alice","Alicea","Alicia","Alida","Alidia","Alie","Alika","Alikee","Alina","Aline","Alis","Alisa","Alisha","Alison","Alissa","Alisun","Alix","Aliza","Alla","Alleen","Allegra","Allene","Alli","Allianora","Allie","Allina","Allis","Allison","Allissa","Allix","Allsun","Allx","Ally","Allyce","Allyn","Allys","Allyson","Alma","Almeda","Almeria","Almeta","Almira","Almire","Aloise","Aloisia","Aloysia","Alta","Althea","Alvera","Alverta","Alvina","Alvinia","Alvira","Alyce","Alyda","Alys","Alysa","Alyse","Alysia","Alyson","Alyss","Alyssa","Amabel","Amabelle","Amalea","Amalee","Amaleta","Amalia","Amalie","Amalita","Amalle","Amanda","Amandi","Amandie","Amandy","Amara","Amargo","Amata","Amber","Amberly","Ambur","Ame","Amelia","Amelie","Amelina","Ameline","Amelita","Ami","Amie","Amii","Amil","Amitie","Amity","Ammamaria","Amy","Amye","Ana","Anabal","Anabel","Anabella","Anabelle","Analiese","Analise","Anallese","Anallise","Anastasia","Anastasie","Anastassia","Anatola","Andee","Andeee","Anderea","Andi","Andie","Andra","Andrea","Andreana","Andree","Andrei","Andria","Andriana","Andriette","Andromache","Andy","Anestassia","Anet","Anett","Anetta","Anette","Ange","Angel","Angela","Angele","Angelia","Angelica","Angelika","Angelina","Angeline","Angelique","Angelita","Angelle","Angie","Angil","Angy","Ania","Anica","Anissa","Anita","Anitra","Anjanette","Anjela","Ann","Ann-marie","Anna","Anna-diana","Anna-diane","Anna-maria","Annabal","Annabel","Annabela","Annabell","Annabella","Annabelle","Annadiana","Annadiane","Annalee","Annaliese","Annalise","Annamaria","Annamarie","Anne","Anne-corinne","Anne-marie","Annecorinne","Anneliese","Annelise","Annemarie","Annetta","Annette","Anni","Annice","Annie","Annis","Annissa","Annmaria","Annmarie","Annnora","Annora","Anny","Anselma","Ansley","Anstice","Anthe","Anthea","Anthia","Anthiathia","Antoinette","Antonella","Antonetta","Antonia","Antonie","Antonietta","Antonina","Anya","Appolonia","April","Aprilette","Ara","Arabel","Arabela","Arabele","Arabella","Arabelle","Arda","Ardath","Ardeen","Ardelia","Ardelis","Ardella","Ardelle","Arden","Ardene","Ardenia","Ardine","Ardis","Ardisj","Ardith","Ardra","Ardyce","Ardys","Ardyth","Aretha","Ariadne","Ariana","Aridatha","Ariel","Ariela","Ariella","Arielle","Arlana","Arlee","Arleen","Arlen","Arlena","Arlene","Arleta","Arlette","Arleyne","Arlie","Arliene","Arlina","Arlinda","Arline","Arluene","Arly","Arlyn","Arlyne","Aryn","Ashely","Ashia","Ashien","Ashil","Ashla","Ashlan","Ashlee","Ashleigh","Ashlen","Ashley","Ashli","Ashlie","Ashly","Asia","Astra","Astrid","Astrix","Atalanta","Athena","Athene","Atlanta","Atlante","Auberta","Aubine","Aubree","Aubrette","Aubrey","Aubrie","Aubry","Audi","Audie","Audra","Audre","Audrey","Audrie","Audry","Audrye","Audy","Augusta","Auguste","Augustina","Augustine","Aundrea","Aura","Aurea","Aurel","Aurelea","Aurelia","Aurelie","Auria","Aurie","Aurilia","Aurlie","Auroora","Aurora","Aurore","Austin","Austina","Austine","Ava","Aveline","Averil","Averyl","Avie","Avis","Aviva","Avivah","Avril","Avrit","Ayn","Bab","Babara","Babb","Babbette","Babbie","Babette","Babita","Babs","Bambi","Bambie","Bamby","Barb","Barbabra","Barbara","Barbara-anne","Barbaraanne","Barbe","Barbee","Barbette","Barbey","Barbi","Barbie","Barbra","Barby","Bari","Barrie","Barry","Basia","Bathsheba","Batsheva","Bea","Beatrice","Beatrisa","Beatrix","Beatriz","Bebe","Becca","Becka","Becki","Beckie","Becky","Bee","Beilul","Beitris","Bekki","Bel","Belia","Belicia","Belinda","Belita","Bell","Bella","Bellanca","Belle","Bellina","Belva","Belvia","Bendite","Benedetta","Benedicta","Benedikta","Benetta","Benita","Benni","Bennie","Benny","Benoite","Berenice","Beret","Berget","Berna","Bernadene","Bernadette","Bernadina","Bernadine","Bernardina","Bernardine","Bernelle","Bernete","Bernetta","Bernette","Berni","Bernice","Bernie","Bernita","Berny","Berri","Berrie","Berry","Bert","Berta","Berte","Bertha","Berthe","Berti","Bertie","Bertina","Bertine","Berty","Beryl","Beryle","Bess","Bessie","Bessy","Beth","Bethanne","Bethany","Bethena","Bethina","Betsey","Betsy","Betta","Bette","Bette-ann","Betteann","Betteanne","Betti","Bettina","Bettine","Betty","Bettye","Beulah","Bev","Beverie","Beverlee","Beverley","Beverlie","Beverly","Bevvy","Bianca","Bianka","Bibbie","Bibby","Bibbye","Bibi","Biddie","Biddy","Bidget","Bili","Bill","Billi","Billie","Billy","Billye","Binni","Binnie","Binny","Bird","Birdie","Birgit","Birgitta","Blair","Blaire","Blake","Blakelee","Blakeley","Blanca","Blanch","Blancha","Blanche","Blinni","Blinnie","Blinny","Bliss","Blisse","Blithe","Blondell","Blondelle","Blondie","Blondy","Blythe","Bobbe","Bobbee","Bobbette","Bobbi","Bobbie","Bobby","Bobbye","Bobette","Bobina","Bobine","Bobinette","Bonita","Bonnee","Bonni","Bonnibelle","Bonnie","Bonny","Brana","Brandais","Brande","Brandea","Brandi","Brandice","Brandie","Brandise","Brandy","Breanne","Brear","Bree","Breena","Bren","Brena","Brenda","Brenn","Brenna","Brett","Bria","Briana","Brianna","Brianne","Bride","Bridget","Bridgette","Bridie","Brier","Brietta","Brigid","Brigida","Brigit","Brigitta","Brigitte","Brina","Briney","Brinn","Brinna","Briny","Brit","Brita","Britney","Britni","Britt","Britta","Brittan","Brittaney","Brittani","Brittany","Britte","Britteny","Brittne","Brittney","Brittni","Brook","Brooke","Brooks","Brunhilda","Brunhilde","Bryana","Bryn","Bryna","Brynn","Brynna","Brynne","Buffy","Bunni","Bunnie","Bunny","Cacilia","Cacilie","Cahra","Cairistiona","Caitlin","Caitrin","Cal","Calida","Calla","Calley","Calli","Callida","Callie","Cally","Calypso","Cam","Camala","Camel","Camella","Camellia","Cami","Camila","Camile","Camilla","Camille","Cammi","Cammie","Cammy","Candace","Candi","Candice","Candida","Candide","Candie","Candis","Candra","Candy","Caprice","Cara","Caralie","Caren","Carena","Caresa","Caressa","Caresse","Carey","Cari","Caria","Carie","Caril","Carilyn","Carin","Carina","Carine","Cariotta","Carissa","Carita","Caritta","Carla","Carlee","Carleen","Carlen","Carlene","Carley","Carlie","Carlin","Carlina","Carline","Carlita","Carlota","Carlotta","Carly","Carlye","Carlyn","Carlynn","Carlynne","Carma","Carmel","Carmela","Carmelia","Carmelina","Carmelita","Carmella","Carmelle","Carmen","Carmencita","Carmina","Carmine","Carmita","Carmon","Caro","Carol","Carol-jean","Carola","Carolan","Carolann","Carole","Carolee","Carolin","Carolina","Caroline","Caroljean","Carolyn","Carolyne","Carolynn","Caron","Carree","Carri","Carrie","Carrissa","Carroll","Carry","Cary","Caryl","Caryn","Casandra","Casey","Casi","Casie","Cass","Cassandra","Cassandre","Cassandry","Cassaundra","Cassey","Cassi","Cassie","Cassondra","Cassy","Catarina","Cate","Caterina","Catha","Catharina","Catharine","Cathe","Cathee","Catherin","Catherina","Catherine","Cathi","Cathie","Cathleen","Cathlene","Cathrin","Cathrine","Cathryn","Cathy","Cathyleen","Cati","Catie","Catina","Catlaina","Catlee","Catlin","Catrina","Catriona","Caty","Caye","Cayla","Cecelia","Cecil","Cecile","Ceciley","Cecilia","Cecilla","Cecily","Ceil","Cele","Celene","Celesta","Celeste","Celestia","Celestina","Celestine","Celestyn","Celestyna","Celia","Celie","Celina","Celinda","Celine","Celinka","Celisse","Celka","Celle","Cesya","Chad","Chanda","Chandal","Chandra","Channa","Chantal","Chantalle","Charil","Charin","Charis","Charissa","Charisse","Charita","Charity","Charla","Charlean","Charleen","Charlena","Charlene","Charline","Charlot","Charlotta","Charlotte","Charmain","Charmaine","Charmane","Charmian","Charmine","Charmion","Charo","Charyl","Chastity","Chelsae","Chelsea","Chelsey","Chelsie","Chelsy","Cher","Chere","Cherey","Cheri","Cherianne","Cherice","Cherida","Cherie","Cherilyn","Cherilynn","Cherin","Cherise","Cherish","Cherlyn","Cherri","Cherrita","Cherry","Chery","Cherye","Cheryl","Cheslie","Chiarra","Chickie","Chicky","Chiquia","Chiquita","Chlo","Chloe","Chloette","Chloris","Chris","Chrissie","Chrissy","Christa","Christabel","Christabella","Christal","Christalle","Christan","Christean","Christel","Christen","Christi","Christian","Christiana","Christiane","Christie","Christin","Christina","Christine","Christy","Christye","Christyna","Chrysa","Chrysler","Chrystal","Chryste","Chrystel","Cicely","Cicily","Ciel","Cilka","Cinda","Cindee","Cindelyn","Cinderella","Cindi","Cindie","Cindra","Cindy","Cinnamon","Cissiee","Cissy","Clair","Claire","Clara","Clarabelle","Clare","Claresta","Clareta","Claretta","Clarette","Clarey","Clari","Claribel","Clarice","Clarie","Clarinda","Clarine","Clarissa","Clarisse","Clarita","Clary","Claude","Claudelle","Claudetta","Claudette","Claudia","Claudie","Claudina","Claudine","Clea","Clem","Clemence","Clementia","Clementina","Clementine","Clemmie","Clemmy","Cleo","Cleopatra","Clerissa","Clio","Clo","Cloe","Cloris","Clotilda","Clovis","Codee","Codi","Codie","Cody","Coleen","Colene","Coletta","Colette","Colleen","Collen","Collete","Collette","Collie","Colline","Colly","Con","Concettina","Conchita","Concordia","Conni","Connie","Conny","Consolata","Constance","Constancia","Constancy","Constanta","Constantia","Constantina","Constantine","Consuela","Consuelo","Cookie","Cora","Corabel","Corabella","Corabelle","Coral","Coralie","Coraline","Coralyn","Cordelia","Cordelie","Cordey","Cordi","Cordie","Cordula","Cordy","Coreen","Corella","Corenda","Corene","Coretta","Corette","Corey","Cori","Corie","Corilla","Corina","Corine","Corinna","Corinne","Coriss","Corissa","Corliss","Corly","Cornela","Cornelia","Cornelle","Cornie","Corny","Correna","Correy","Corri","Corrianne","Corrie","Corrina","Corrine","Corrinne","Corry","Cortney","Cory","Cosetta","Cosette","Costanza","Courtenay","Courtnay","Courtney","Crin","Cris","Crissie","Crissy","Crista","Cristabel","Cristal","Cristen","Cristi","Cristie","Cristin","Cristina","Cristine","Cristionna","Cristy","Crysta","Crystal","Crystie","Cthrine","Cyb","Cybil","Cybill","Cymbre","Cynde","Cyndi","Cyndia","Cyndie","Cyndy","Cynthea","Cynthia","Cynthie","Cynthy","Dacey","Dacia","Dacie","Dacy","Dael","Daffi","Daffie","Daffy","Dagmar","Dahlia","Daile","Daisey","Daisi","Daisie","Daisy","Dale","Dalenna","Dalia","Dalila","Dallas","Daloris","Damara","Damaris","Damita","Dana","Danell","Danella","Danette","Dani","Dania","Danica","Danice","Daniela","Daniele","Daniella","Danielle","Danika","Danila","Danit","Danita","Danna","Danni","Dannie","Danny","Dannye","Danya","Danyelle","Danyette","Daphene","Daphna","Daphne","Dara","Darb","Darbie","Darby","Darcee","Darcey","Darci","Darcie","Darcy","Darda","Dareen","Darell","Darelle","Dari","Daria","Darice","Darla","Darleen","Darlene","Darline","Darlleen","Daron","Darrelle","Darryl","Darsey","Darsie","Darya","Daryl","Daryn","Dasha","Dasi","Dasie","Dasya","Datha","Daune","Daveen","Daveta","Davida","Davina","Davine","Davita","Dawn","Dawna","Dayle","Dayna","Ddene","De","Deana","Deane","Deanna","Deanne","Deb","Debbi","Debbie","Debby","Debee","Debera","Debi","Debor","Debora","Deborah","Debra","Dede","Dedie","Dedra","Dee","Deeann","Deeanne","Deedee","Deena","Deerdre","Deeyn","Dehlia","Deidre","Deina","Deirdre","Del","Dela","Delcina","Delcine","Delia","Delila","Delilah","Delinda","Dell","Della","Delly","Delora","Delores","Deloria","Deloris","Delphine","Delphinia","Demeter","Demetra","Demetria","Demetris","Dena","Deni","Denice","Denise","Denna","Denni","Dennie","Denny","Deny","Denys","Denyse","Deonne","Desdemona","Desirae","Desiree","Desiri","Deva","Devan","Devi","Devin","Devina","Devinne","Devon","Devondra","Devonna","Devonne","Devora","Di","Diahann","Dian","Diana","Diandra","Diane","Diane-marie","Dianemarie","Diann","Dianna","Dianne","Diannne","Didi","Dido","Diena","Dierdre","Dina","Dinah","Dinnie","Dinny","Dion","Dione","Dionis","Dionne","Dita","Dix","Dixie","Dniren","Dode","Dodi","Dodie","Dody","Doe","Doll","Dolley","Dolli","Dollie","Dolly","Dolores","Dolorita","Doloritas","Domeniga","Dominga","Domini","Dominica","Dominique","Dona","Donella","Donelle","Donetta","Donia","Donica","Donielle","Donna","Donnamarie","Donni","Donnie","Donny","Dora","Doralia","Doralin","Doralyn","Doralynn","Doralynne","Dore","Doreen","Dorelia","Dorella","Dorelle","Dorena","Dorene","Doretta","Dorette","Dorey","Dori","Doria","Dorian","Dorice","Dorie","Dorine","Doris","Dorisa","Dorise","Dorita","Doro","Dorolice","Dorolisa","Dorotea","Doroteya","Dorothea","Dorothee","Dorothy","Dorree","Dorri","Dorrie","Dorris","Dorry","Dorthea","Dorthy","Dory","Dosi","Dot","Doti","Dotti","Dottie","Dotty","Dre","Dreddy","Dredi","Drona","Dru","Druci","Drucie","Drucill","Drucy","Drusi","Drusie","Drusilla","Drusy","Dulce","Dulcea","Dulci","Dulcia","Dulciana","Dulcie","Dulcine","Dulcinea","Dulcy","Dulsea","Dusty","Dyan","Dyana","Dyane","Dyann","Dyanna","Dyanne","Dyna","Dynah","Eachelle","Eada","Eadie","Eadith","Ealasaid","Eartha","Easter","Eba","Ebba","Ebonee","Ebony","Eda","Eddi","Eddie","Eddy","Ede","Edee","Edeline","Eden","Edi","Edie","Edin","Edita","Edith","Editha","Edithe","Ediva","Edna","Edwina","Edy","Edyth","Edythe","Effie","Eileen","Eilis","Eimile","Eirena","Ekaterina","Elaina","Elaine","Elana","Elane","Elayne","Elberta","Elbertina","Elbertine","Eleanor","Eleanora","Eleanore","Electra","Eleen","Elena","Elene","Eleni","Elenore","Eleonora","Eleonore","Elfie","Elfreda","Elfrida","Elfrieda","Elga","Elianora","Elianore","Elicia","Elie","Elinor","Elinore","Elisa","Elisabet","Elisabeth","Elisabetta","Elise","Elisha","Elissa","Elita","Eliza","Elizabet","Elizabeth","Elka","Elke","Ella","Elladine","Elle","Ellen","Ellene","Ellette","Elli","Ellie","Ellissa","Elly","Ellyn","Ellynn","Elmira","Elna","Elnora","Elnore","Eloisa","Eloise","Elonore","Elora","Elsa","Elsbeth","Else","Elset","Elsey","Elsi","Elsie","Elsinore","Elspeth","Elsy","Elva","Elvera","Elvina","Elvira","Elwira","Elyn","Elyse","Elysee","Elysha","Elysia","Elyssa","Em","Ema","Emalee","Emalia","Emelda","Emelia","Emelina","Emeline","Emelita","Emelyne","Emera","Emilee","Emili","Emilia","Emilie","Emiline","Emily","Emlyn","Emlynn","Emlynne","Emma","Emmalee","Emmaline","Emmalyn","Emmalynn","Emmalynne","Emmeline","Emmey","Emmi","Emmie","Emmy","Emmye","Emogene","Emyle","Emylee","Engracia","Enid","Enrica","Enrichetta","Enrika","Enriqueta","Eolanda","Eolande","Eran","Erda","Erena","Erica","Ericha","Ericka","Erika","Erin","Erina","Erinn","Erinna","Erma","Ermengarde","Ermentrude","Ermina","Erminia","Erminie","Erna","Ernaline","Ernesta","Ernestine","Ertha","Eryn","Esma","Esmaria","Esme","Esmeralda","Essa","Essie","Essy","Esta","Estel","Estele","Estell","Estella","Estelle","Ester","Esther","Estrella","Estrellita","Ethel","Ethelda","Ethelin","Ethelind","Etheline","Ethelyn","Ethyl","Etta","Etti","Ettie","Etty","Eudora","Eugenia","Eugenie","Eugine","Eula","Eulalie","Eunice","Euphemia","Eustacia","Eva","Evaleen","Evangelia","Evangelin","Evangelina","Evangeline","Evania","Evanne","Eve","Eveleen","Evelina","Eveline","Evelyn","Evey","Evie","Evita","Evonne","Evvie","Evvy","Evy","Eyde","Eydie","Ezmeralda","Fae","Faina","Faith","Fallon","Fan","Fanchette","Fanchon","Fancie","Fancy","Fanechka","Fania","Fanni","Fannie","Fanny","Fanya","Fara","Farah","Farand","Farica","Farra","Farrah","Farrand","Faun","Faunie","Faustina","Faustine","Fawn","Fawne","Fawnia","Fay","Faydra","Faye","Fayette","Fayina","Fayre","Fayth","Faythe","Federica","Fedora","Felecia","Felicdad","Felice","Felicia","Felicity","Felicle","Felipa","Felisha","Felita","Feliza","Fenelia","Feodora","Ferdinanda","Ferdinande","Fern","Fernanda","Fernande","Fernandina","Ferne","Fey","Fiann","Fianna","Fidela","Fidelia","Fidelity","Fifi","Fifine","Filia","Filide","Filippa","Fina","Fiona","Fionna","Fionnula","Fiorenze","Fleur","Fleurette","Flo","Flor","Flora","Florance","Flore","Florella","Florence","Florencia","Florentia","Florenza","Florette","Flori","Floria","Florida","Florie","Florina","Florinda","Floris","Florri","Florrie","Florry","Flory","Flossi","Flossie","Flossy","Flss","Fran","Francene","Frances","Francesca","Francine","Francisca","Franciska","Francoise","Francyne","Frank","Frankie","Franky","Franni","Frannie","Franny","Frayda","Fred","Freda","Freddi","Freddie","Freddy","Fredelia","Frederica","Fredericka","Frederique","Fredi","Fredia","Fredra","Fredrika","Freida","Frieda","Friederike","Fulvia","Gabbey","Gabbi","Gabbie","Gabey","Gabi","Gabie","Gabriel","Gabriela","Gabriell","Gabriella","Gabrielle","Gabriellia","Gabrila","Gaby","Gae","Gael","Gail","Gale","Galina","Garland","Garnet","Garnette","Gates","Gavra","Gavrielle","Gay","Gaye","Gayel","Gayla","Gayle","Gayleen","Gaylene","Gaynor","Gelya","Gena","Gene","Geneva","Genevieve","Genevra","Genia","Genna","Genni","Gennie","Gennifer","Genny","Genovera","Genvieve","George","Georgeanna","Georgeanne","Georgena","Georgeta","Georgetta","Georgette","Georgia","Georgiana","Georgianna","Georgianne","Georgie","Georgina","Georgine","Geralda","Geraldine","Gerda","Gerhardine","Geri","Gerianna","Gerianne","Gerladina","Germain","Germaine","Germana","Gerri","Gerrie","Gerrilee","Gerry","Gert","Gerta","Gerti","Gertie","Gertrud","Gertruda","Gertrude","Gertrudis","Gerty","Giacinta","Giana","Gianina","Gianna","Gigi","Gilberta","Gilberte","Gilbertina","Gilbertine","Gilda","Gilemette","Gill","Gillan","Gilli","Gillian","Gillie","Gilligan","Gilly","Gina","Ginelle","Ginevra","Ginger","Ginni","Ginnie","Ginnifer","Ginny","Giorgia","Giovanna","Gipsy","Giralda","Gisela","Gisele","Gisella","Giselle","Giuditta","Giulia","Giulietta","Giustina","Gizela","Glad","Gladi","Gladys","Gleda","Glen","Glenda","Glenine","Glenn","Glenna","Glennie","Glennis","Glori","Gloria","Gloriana","Gloriane","Glory","Glyn","Glynda","Glynis","Glynnis","Gnni","Godiva","Golda","Goldarina","Goldi","Goldia","Goldie","Goldina","Goldy","Grace","Gracia","Gracie","Grata","Gratia","Gratiana","Gray","Grayce","Grazia","Greer","Greta","Gretal","Gretchen","Grete","Gretel","Grethel","Gretna","Gretta","Grier","Griselda","Grissel","Guendolen","Guenevere","Guenna","Guglielma","Gui","Guillema","Guillemette","Guinevere","Guinna","Gunilla","Gus","Gusella","Gussi","Gussie","Gussy","Gusta","Gusti","Gustie","Gusty","Gwen","Gwendolen","Gwendolin","Gwendolyn","Gweneth","Gwenette","Gwenneth","Gwenni","Gwennie","Gwenny","Gwenora","Gwenore","Gwyn","Gwyneth","Gwynne","Gypsy","Hadria","Hailee","Haily","Haleigh","Halette","Haley","Hali","Halie","Halimeda","Halley","Halli","Hallie","Hally","Hana","Hanna","Hannah","Hanni","Hannie","Hannis","Hanny","Happy","Harlene","Harley","Harli","Harlie","Harmonia","Harmonie","Harmony","Harri","Harrie","Harriet","Harriett","Harrietta","Harriette","Harriot","Harriott","Hatti","Hattie","Hatty","Hayley","Hazel","Heath","Heather","Heda","Hedda","Heddi","Heddie","Hedi","Hedvig","Hedvige","Hedwig","Hedwiga","Hedy","Heida","Heidi","Heidie","Helaina","Helaine","Helen","Helen-elizabeth","Helena","Helene","Helenka","Helga","Helge","Helli","Heloise","Helsa","Helyn","Hendrika","Henka","Henrie","Henrieta","Henrietta","Henriette","Henryetta","Hephzibah","Hermia","Hermina","Hermine","Herminia","Hermione","Herta","Hertha","Hester","Hesther","Hestia","Hetti","Hettie","Hetty","Hilary","Hilda","Hildagard","Hildagarde","Hilde","Hildegaard","Hildegarde","Hildy","Hillary","Hilliary","Hinda","Holli","Hollie","Holly","Holly-anne","Hollyanne","Honey","Honor","Honoria","Hope","Horatia","Hortense","Hortensia","Hulda","Hyacinth","Hyacintha","Hyacinthe","Hyacinthia","Hyacinthie","Hynda","Ianthe","Ibbie","Ibby","Ida","Idalia","Idalina","Idaline","Idell","Idelle","Idette","Ileana","Ileane","Ilene","Ilise","Ilka","Illa","Ilsa","Ilse","Ilysa","Ilyse","Ilyssa","Imelda","Imogen","Imogene","Imojean","Ina","Indira","Ines","Inesita","Inessa","Inez","Inga","Ingaberg","Ingaborg","Inge","Ingeberg","Ingeborg","Inger","Ingrid","Ingunna","Inna","Iolande","Iolanthe","Iona","Iormina","Ira","Irena","Irene","Irina","Iris","Irita","Irma","Isa","Isabel","Isabelita","Isabella","Isabelle","Isadora","Isahella","Iseabal","Isidora","Isis","Isobel","Issi","Issie","Issy","Ivett","Ivette","Ivie","Ivonne","Ivory","Ivy","Izabel","Jacenta","Jacinda","Jacinta","Jacintha","Jacinthe","Jackelyn","Jacki","Jackie","Jacklin","Jacklyn","Jackquelin","Jackqueline","Jacky","Jaclin","Jaclyn","Jacquelin","Jacqueline","Jacquelyn","Jacquelynn","Jacquenetta","Jacquenette","Jacquetta","Jacquette","Jacqui","Jacquie","Jacynth","Jada","Jade","Jaime","Jaimie","Jaine","Jami","Jamie","Jamima","Jammie","Jan","Jana","Janaya","Janaye","Jandy","Jane","Janean","Janeczka","Janeen","Janel","Janela","Janella","Janelle","Janene","Janenna","Janessa","Janet","Janeta","Janetta","Janette","Janeva","Janey","Jania","Janice","Janie","Janifer","Janina","Janine","Janis","Janith","Janka","Janna","Jannel","Jannelle","Janot","Jany","Jaquelin","Jaquelyn","Jaquenetta","Jaquenette","Jaquith","Jasmin","Jasmina","Jasmine","Jayme","Jaymee","Jayne","Jaynell","Jazmin","Jean","Jeana","Jeane","Jeanelle","Jeanette","Jeanie","Jeanine","Jeanna","Jeanne","Jeannette","Jeannie","Jeannine","Jehanna","Jelene","Jemie","Jemima","Jemimah","Jemmie","Jemmy","Jen","Jena","Jenda","Jenelle","Jeni","Jenica","Jeniece","Jenifer","Jeniffer","Jenilee","Jenine","Jenn","Jenna","Jennee","Jennette","Jenni","Jennica","Jennie","Jennifer","Jennilee","Jennine","Jenny","Jeralee","Jere","Jeri","Jermaine","Jerrie","Jerrilee","Jerrilyn","Jerrine","Jerry","Jerrylee","Jess","Jessa","Jessalin","Jessalyn","Jessamine","Jessamyn","Jesse","Jesselyn","Jessi","Jessica","Jessie","Jessika","Jessy","Jewel","Jewell","Jewelle","Jill","Jillana","Jillane","Jillayne","Jilleen","Jillene","Jilli","Jillian","Jillie","Jilly","Jinny","Jo","Jo-ann","Jo-anne","Joan","Joana","Joane","Joanie","Joann","Joanna","Joanne","Joannes","Jobey","Jobi","Jobie","Jobina","Joby","Jobye","Jobyna","Jocelin","Joceline","Jocelyn","Jocelyne","Jodee","Jodi","Jodie","Jody","Joeann","Joela","Joelie","Joell","Joella","Joelle","Joellen","Joelly","Joellyn","Joelynn","Joete","Joey","Johanna","Johannah","Johna","Johnath","Johnette","Johnna","Joice","Jojo","Jolee","Joleen","Jolene","Joletta","Joli","Jolie","Joline","Joly","Jolyn","Jolynn","Jonell","Joni","Jonie","Jonis","Jordain","Jordan","Jordana","Jordanna","Jorey","Jori","Jorie","Jorrie","Jorry","Joscelin","Josee","Josefa","Josefina","Josepha","Josephina","Josephine","Josey","Josi","Josie","Josselyn","Josy","Jourdan","Joy","Joya","Joyan","Joyann","Joyce","Joycelin","Joye","Jsandye","Juana","Juanita","Judi","Judie","Judith","Juditha","Judy","Judye","Juieta","Julee","Juli","Julia","Juliana","Juliane","Juliann","Julianna","Julianne","Julie","Julienne","Juliet","Julieta","Julietta","Juliette","Julina","Juline","Julissa","Julita","June","Junette","Junia","Junie","Junina","Justina","Justine","Justinn","Jyoti","Kacey","Kacie","Kacy","Kaela","Kai","Kaia","Kaila","Kaile","Kailey","Kaitlin","Kaitlyn","Kaitlynn","Kaja","Kakalina","Kala","Kaleena","Kali","Kalie","Kalila","Kalina","Kalinda","Kalindi","Kalli","Kally","Kameko","Kamila","Kamilah","Kamillah","Kandace","Kandy","Kania","Kanya","Kara","Kara-lynn","Karalee","Karalynn","Kare","Karee","Karel","Karen","Karena","Kari","Karia","Karie","Karil","Karilynn","Karin","Karina","Karine","Kariotta","Karisa","Karissa","Karita","Karla","Karlee","Karleen","Karlen","Karlene","Karlie","Karlotta","Karlotte","Karly","Karlyn","Karmen","Karna","Karol","Karola","Karole","Karolina","Karoline","Karoly","Karon","Karrah","Karrie","Karry","Kary","Karyl","Karylin","Karyn","Kasey","Kass","Kassandra","Kassey","Kassi","Kassia","Kassie","Kat","Kata","Katalin","Kate","Katee","Katerina","Katerine","Katey","Kath","Katha","Katharina","Katharine","Katharyn","Kathe","Katherina","Katherine","Katheryn","Kathi","Kathie","Kathleen","Kathlin","Kathrine","Kathryn","Kathryne","Kathy","Kathye","Kati","Katie","Katina","Katine","Katinka","Katleen","Katlin","Katrina","Katrine","Katrinka","Katti","Kattie","Katuscha","Katusha","Katy","Katya","Kay","Kaycee","Kaye","Kayla","Kayle","Kaylee","Kayley","Kaylil","Kaylyn","Keeley","Keelia","Keely","Kelcey","Kelci","Kelcie","Kelcy","Kelila","Kellen","Kelley","Kelli","Kellia","Kellie","Kellina","Kellsie","Kelly","Kellyann","Kelsey","Kelsi","Kelsy","Kendra","Kendre","Kenna","Keri","Keriann","Kerianne","Kerri","Kerrie","Kerrill","Kerrin","Kerry","Kerstin","Kesley","Keslie","Kessia","Kessiah","Ketti","Kettie","Ketty","Kevina","Kevyn","Ki","Kiah","Kial","Kiele","Kiersten","Kikelia","Kiley","Kim","Kimberlee","Kimberley","Kimberli","Kimberly","Kimberlyn","Kimbra","Kimmi","Kimmie","Kimmy","Kinna","Kip","Kipp","Kippie","Kippy","Kira","Kirbee","Kirbie","Kirby","Kiri","Kirsten","Kirsteni","Kirsti","Kirstin","Kirstyn","Kissee","Kissiah","Kissie","Kit","Kitti","Kittie","Kitty","Kizzee","Kizzie","Klara","Klarika","Klarrisa","Konstance","Konstanze","Koo","Kora","Koral","Koralle","Kordula","Kore","Korella","Koren","Koressa","Kori","Korie","Korney","Korrie","Korry","Kris","Krissie","Krissy","Krista","Kristal","Kristan","Kriste","Kristel","Kristen","Kristi","Kristien","Kristin","Kristina","Kristine","Kristy","Kristyn","Krysta","Krystal","Krystalle","Krystle","Krystyna","Kyla","Kyle","Kylen","Kylie","Kylila","Kylynn","Kym","Kynthia","Kyrstin","Lacee","Lacey","Lacie","Lacy","Ladonna","Laetitia","Laina","Lainey","Lana","Lanae","Lane","Lanette","Laney","Lani","Lanie","Lanita","Lanna","Lanni","Lanny","Lara","Laraine","Lari","Larina","Larine","Larisa","Larissa","Lark","Laryssa","Latashia","Latia","Latisha","Latrena","Latrina","Laura","Lauraine","Laural","Lauralee","Laure","Lauree","Laureen","Laurel","Laurella","Lauren","Laurena","Laurene","Lauretta","Laurette","Lauri","Laurianne","Laurice","Laurie","Lauryn","Lavena","Laverna","Laverne","Lavina","Lavinia","Lavinie","Layla","Layne","Layney","Lea","Leah","Leandra","Leann","Leanna","Leanor","Leanora","Lebbie","Leda","Lee","Leeann","Leeanne","Leela","Leelah","Leena","Leesa","Leese","Legra","Leia","Leigh","Leigha","Leila","Leilah","Leisha","Lela","Lelah","Leland","Lelia","Lena","Lenee","Lenette","Lenka","Lenna","Lenora","Lenore","Leodora","Leoine","Leola","Leoline","Leona","Leonanie","Leone","Leonelle","Leonie","Leonora","Leonore","Leontine","Leontyne","Leora","Leshia","Lesley","Lesli","Leslie","Lesly","Lesya","Leta","Lethia","Leticia","Letisha","Letitia","Letizia","Letta","Letti","Lettie","Letty","Lexi","Lexie","Lexine","Lexis","Lexy","Leyla","Lezlie","Lia","Lian","Liana","Liane","Lianna","Lianne","Lib","Libbey","Libbi","Libbie","Libby","Licha","Lida","Lidia","Liesa","Lil","Lila","Lilah","Lilas","Lilia","Lilian","Liliane","Lilias","Lilith","Lilla","Lilli","Lillian","Lillis","Lilllie","Lilly","Lily","Lilyan","Lin","Lina","Lind","Linda","Lindi","Lindie","Lindsay","Lindsey","Lindsy","Lindy","Linea","Linell","Linet","Linette","Linn","Linnea","Linnell","Linnet","Linnie","Linzy","Lira","Lisa","Lisabeth","Lisbeth","Lise","Lisetta","Lisette","Lisha","Lishe","Lissa","Lissi","Lissie","Lissy","Lita","Liuka","Liv","Liva","Livia","Livvie","Livvy","Livvyy","Livy","Liz","Liza","Lizabeth","Lizbeth","Lizette","Lizzie","Lizzy","Loella","Lois","Loise","Lola","Loleta","Lolita","Lolly","Lona","Lonee","Loni","Lonna","Lonni","Lonnie","Lora","Lorain","Loraine","Loralee","Loralie","Loralyn","Loree","Loreen","Lorelei","Lorelle","Loren","Lorena","Lorene","Lorenza","Loretta","Lorette","Lori","Loria","Lorianna","Lorianne","Lorie","Lorilee","Lorilyn","Lorinda","Lorine","Lorita","Lorna","Lorne","Lorraine","Lorrayne","Lorri","Lorrie","Lorrin","Lorry","Lory","Lotta","Lotte","Lotti","Lottie","Lotty","Lou","Louella","Louisa","Louise","Louisette","Loutitia","Lu","Luce","Luci","Lucia","Luciana","Lucie","Lucienne","Lucila","Lucilia","Lucille","Lucina","Lucinda","Lucine","Lucita","Lucky","Lucretia","Lucy","Ludovika","Luella","Luelle","Luisa","Luise","Lula","Lulita","Lulu","Lura","Lurette","Lurleen","Lurlene","Lurline","Lusa","Luz","Lyda","Lydia","Lydie","Lyn","Lynda","Lynde","Lyndel","Lyndell","Lyndsay","Lyndsey","Lyndsie","Lyndy","Lynea","Lynelle","Lynett","Lynette","Lynn","Lynna","Lynne","Lynnea","Lynnell","Lynnelle","Lynnet","Lynnett","Lynnette","Lynsey","Lyssa","Mab","Mabel","Mabelle","Mable","Mada","Madalena","Madalyn","Maddalena","Maddi","Maddie","Maddy","Madel","Madelaine","Madeleine","Madelena","Madelene","Madelin","Madelina","Madeline","Madella","Madelle","Madelon","Madelyn","Madge","Madlen","Madlin","Madonna","Mady","Mae","Maegan","Mag","Magda","Magdaia","Magdalen","Magdalena","Magdalene","Maggee","Maggi","Maggie","Maggy","Mahala","Mahalia","Maia","Maible","Maiga","Maighdiln","Mair","Maire","Maisey","Maisie","Maitilde","Mala","Malanie","Malena","Malia","Malina","Malinda","Malinde","Malissa","Malissia","Mallissa","Mallorie","Mallory","Malorie","Malory","Malva","Malvina","Malynda","Mame","Mamie","Manda","Mandi","Mandie","Mandy","Manon","Manya","Mara","Marabel","Marcela","Marcelia","Marcella","Marcelle","Marcellina","Marcelline","Marchelle","Marci","Marcia","Marcie","Marcile","Marcille","Marcy","Mareah","Maren","Marena","Maressa","Marga","Margalit","Margalo","Margaret","Margareta","Margarete","Margaretha","Margarethe","Margaretta","Margarette","Margarita","Margaux","Marge","Margeaux","Margery","Marget","Margette","Margi","Margie","Margit","Margo","Margot","Margret","Marguerite","Margy","Mari","Maria","Mariam","Marian","Mariana","Mariann","Marianna","Marianne","Maribel","Maribelle","Maribeth","Marice","Maridel","Marie","Marie-ann","Marie-jeanne","Marieann","Mariejeanne","Mariel","Mariele","Marielle","Mariellen","Marietta","Mariette","Marigold","Marijo","Marika","Marilee","Marilin","Marillin","Marilyn","Marin","Marina","Marinna","Marion","Mariquilla","Maris","Marisa","Mariska","Marissa","Marita","Maritsa","Mariya","Marj","Marja","Marje","Marji","Marjie","Marjorie","Marjory","Marjy","Marketa","Marla","Marlane","Marleah","Marlee","Marleen","Marlena","Marlene","Marley","Marlie","Marline","Marlo","Marlyn","Marna","Marne","Marney","Marni","Marnia","Marnie","Marquita","Marrilee","Marris","Marrissa","Marsha","Marsiella","Marta","Martelle","Martguerita","Martha","Marthe","Marthena","Marti","Martica","Martie","Martina","Martita","Marty","Martynne","Mary","Marya","Maryann","Maryanna","Maryanne","Marybelle","Marybeth","Maryellen","Maryjane","Maryjo","Maryl","Marylee","Marylin","Marylinda","Marylou","Marylynne","Maryrose","Marys","Marysa","Masha","Matelda","Mathilda","Mathilde","Matilda","Matilde","Matti","Mattie","Matty","Maud","Maude","Maudie","Maura","Maure","Maureen","Maureene","Maurene","Maurine","Maurise","Maurita","Maurizia","Mavis","Mavra","Max","Maxi","Maxie","Maxine","Maxy","May","Maybelle","Maye","Mead","Meade","Meagan","Meaghan","Meara","Mechelle","Meg","Megan","Megen","Meggi","Meggie","Meggy","Meghan","Meghann","Mehetabel","Mei","Mel","Mela","Melamie","Melania","Melanie","Melantha","Melany","Melba","Melesa","Melessa","Melicent","Melina","Melinda","Melinde","Melisa","Melisande","Melisandra","Melisenda","Melisent","Melissa","Melisse","Melita","Melitta","Mella","Melli","Mellicent","Mellie","Mellisa","Mellisent","Melloney","Melly","Melodee","Melodie","Melody","Melonie","Melony","Melosa","Melva","Mercedes","Merci","Mercie","Mercy","Meredith","Meredithe","Meridel","Meridith","Meriel","Merilee","Merilyn","Meris","Merissa","Merl","Merla","Merle","Merlina","Merline","Merna","Merola","Merralee","Merridie","Merrie","Merrielle","Merrile","Merrilee","Merrili","Merrill","Merrily","Merry","Mersey","Meryl","Meta","Mia","Micaela","Michaela","Michaelina","Michaeline","Michaella","Michal","Michel","Michele","Michelina","Micheline","Michell","Michelle","Micki","Mickie","Micky","Midge","Mignon","Mignonne","Miguela","Miguelita","Mikaela","Mil","Mildred","Mildrid","Milena","Milicent","Milissent","Milka","Milli","Millicent","Millie","Millisent","Milly","Milzie","Mimi","Min","Mina","Minda","Mindy","Minerva","Minetta","Minette","Minna","Minnaminnie","Minne","Minni","Minnie","Minnnie","Minny","Minta","Miquela","Mira","Mirabel","Mirabella","Mirabelle","Miran","Miranda","Mireielle","Mireille","Mirella","Mirelle","Miriam","Mirilla","Mirna","Misha","Missie","Missy","Misti","Misty","Mitzi","Modesta","Modestia","Modestine","Modesty","Moina","Moira","Moll","Mollee","Molli","Mollie","Molly","Mommy","Mona","Monah","Monica","Monika","Monique","Mora","Moreen","Morena","Morgan","Morgana","Morganica","Morganne","Morgen","Moria","Morissa","Morna","Moselle","Moyna","Moyra","Mozelle","Muffin","Mufi","Mufinella","Muire","Mureil","Murial","Muriel","Murielle","Myra","Myrah","Myranda","Myriam","Myrilla","Myrle","Myrlene","Myrna","Myrta","Myrtia","Myrtice","Myrtie","Myrtle","Nada","Nadean","Nadeen","Nadia","Nadine","Nadiya","Nady","Nadya","Nalani","Nan","Nana","Nananne","Nance","Nancee","Nancey","Nanci","Nancie","Nancy","Nanete","Nanette","Nani","Nanice","Nanine","Nannette","Nanni","Nannie","Nanny","Nanon","Naoma","Naomi","Nara","Nari","Nariko","Nat","Nata","Natala","Natalee","Natalie","Natalina","Nataline","Natalya","Natasha","Natassia","Nathalia","Nathalie","Natividad","Natka","Natty","Neala","Neda","Nedda","Nedi","Neely","Neila","Neile","Neilla","Neille","Nelia","Nelie","Nell","Nelle","Nelli","Nellie","Nelly","Nerissa","Nerita","Nert","Nerta","Nerte","Nerti","Nertie","Nerty","Nessa","Nessi","Nessie","Nessy","Nesta","Netta","Netti","Nettie","Nettle","Netty","Nevsa","Neysa","Nichol","Nichole","Nicholle","Nicki","Nickie","Nicky","Nicol","Nicola","Nicole","Nicolea","Nicolette","Nicoli","Nicolina","Nicoline","Nicolle","Nikaniki","Nike","Niki","Nikki","Nikkie","Nikoletta","Nikolia","Nina","Ninetta","Ninette","Ninnetta","Ninnette","Ninon","Nissa","Nisse","Nissie","Nissy","Nita","Nixie","Noami","Noel","Noelani","Noell","Noella","Noelle","Noellyn","Noelyn","Noemi","Nola","Nolana","Nolie","Nollie","Nomi","Nona","Nonah","Noni","Nonie","Nonna","Nonnah","Nora","Norah","Norean","Noreen","Norene","Norina","Norine","Norma","Norri","Norrie","Norry","Novelia","Nydia","Nyssa","Octavia","Odele","Odelia","Odelinda","Odella","Odelle","Odessa","Odetta","Odette","Odilia","Odille","Ofelia","Ofella","Ofilia","Ola","Olenka","Olga","Olia","Olimpia","Olive","Olivette","Olivia","Olivie","Oliy","Ollie","Olly","Olva","Olwen","Olympe","Olympia","Olympie","Ondrea","Oneida","Onida","Oona","Opal","Opalina","Opaline","Ophelia","Ophelie","Ora","Oralee","Oralia","Oralie","Oralla","Oralle","Orel","Orelee","Orelia","Orelie","Orella","Orelle","Oriana","Orly","Orsa","Orsola","Ortensia","Otha","Othelia","Othella","Othilia","Othilie","Ottilie","Page","Paige","Paloma","Pam","Pamela","Pamelina","Pamella","Pammi","Pammie","Pammy","Pandora","Pansie","Pansy","Paola","Paolina","Papagena","Pat","Patience","Patrica","Patrice","Patricia","Patrizia","Patsy","Patti","Pattie","Patty","Paula","Paule","Pauletta","Paulette","Pauli","Paulie","Paulina","Pauline","Paulita","Pauly","Pavia","Pavla","Pearl","Pearla","Pearle","Pearline","Peg","Pegeen","Peggi","Peggie","Peggy","Pen","Penelopa","Penelope","Penni","Pennie","Penny","Pepi","Pepita","Peri","Peria","Perl","Perla","Perle","Perri","Perrine","Perry","Persis","Pet","Peta","Petra","Petrina","Petronella","Petronia","Petronilla","Petronille","Petunia","Phaedra","Phaidra","Phebe","Phedra","Phelia","Phil","Philipa","Philippa","Philippe","Philippine","Philis","Phillida","Phillie","Phillis","Philly","Philomena","Phoebe","Phylis","Phyllida","Phyllis","Phyllys","Phylys","Pia","Pier","Pierette","Pierrette","Pietra","Piper","Pippa","Pippy","Polly","Pollyanna","Pooh","Poppy","Portia","Pris","Prisca","Priscella","Priscilla","Prissie","Pru","Prudence","Prudi","Prudy","Prue","Queenie","Quentin","Querida","Quinn","Quinta","Quintana","Quintilla","Quintina","Rachael","Rachel","Rachele","Rachelle","Rae","Raeann","Raf","Rafa","Rafaela","Rafaelia","Rafaelita","Rahal","Rahel","Raina","Raine","Rakel","Ralina","Ramona","Ramonda","Rana","Randa","Randee","Randene","Randi","Randie","Randy","Ranee","Rani","Rania","Ranice","Ranique","Ranna","Raphaela","Raquel","Raquela","Rasia","Rasla","Raven","Ray","Raychel","Raye","Rayna","Raynell","Rayshell","Rea","Reba","Rebbecca","Rebe","Rebeca","Rebecca","Rebecka","Rebeka","Rebekah","Rebekkah","Ree","Reeba","Reena","Reeta","Reeva","Regan","Reggi","Reggie","Regina","Regine","Reiko","Reina","Reine","Remy","Rena","Renae","Renata","Renate","Rene","Renee","Renell","Renelle","Renie","Rennie","Reta","Retha","Revkah","Rey","Reyna","Rhea","Rheba","Rheta","Rhetta","Rhiamon","Rhianna","Rhianon","Rhoda","Rhodia","Rhodie","Rhody","Rhona","Rhonda","Riane","Riannon","Rianon","Rica","Ricca","Rici","Ricki","Rickie","Ricky","Riki","Rikki","Rina","Risa","Rita","Riva","Rivalee","Rivi","Rivkah","Rivy","Roana","Roanna","Roanne","Robbi","Robbie","Robbin","Robby","Robbyn","Robena","Robenia","Roberta","Robin","Robina","Robinet","Robinett","Robinetta","Robinette","Robinia","Roby","Robyn","Roch","Rochell","Rochella","Rochelle","Rochette","Roda","Rodi","Rodie","Rodina","Rois","Romola","Romona","Romonda","Romy","Rona","Ronalda","Ronda","Ronica","Ronna","Ronni","Ronnica","Ronnie","Ronny","Roobbie","Rora","Rori","Rorie","Rory","Ros","Rosa","Rosabel","Rosabella","Rosabelle","Rosaleen","Rosalia","Rosalie","Rosalind","Rosalinda","Rosalinde","Rosaline","Rosalyn","Rosalynd","Rosamond","Rosamund","Rosana","Rosanna","Rosanne","Rose","Roseann","Roseanna","Roseanne","Roselia","Roselin","Roseline","Rosella","Roselle","Rosemaria","Rosemarie","Rosemary","Rosemonde","Rosene","Rosetta","Rosette","Roshelle","Rosie","Rosina","Rosita","Roslyn","Rosmunda","Rosy","Row","Rowe","Rowena","Roxana","Roxane","Roxanna","Roxanne","Roxi","Roxie","Roxine","Roxy","Roz","Rozalie","Rozalin","Rozamond","Rozanna","Rozanne","Roze","Rozele","Rozella","Rozelle","Rozina","Rubetta","Rubi","Rubia","Rubie","Rubina","Ruby","Ruperta","Ruth","Ruthann","Ruthanne","Ruthe","Ruthi","Ruthie","Ruthy","Ryann","Rycca","Saba","Sabina","Sabine","Sabra","Sabrina","Sacha","Sada","Sadella","Sadie","Sadye","Saidee","Sal","Salaidh","Sallee","Salli","Sallie","Sally","Sallyann","Sallyanne","Saloma","Salome","Salomi","Sam","Samantha","Samara","Samaria","Sammy","Sande","Sandi","Sandie","Sandra","Sandy","Sandye","Sapphira","Sapphire","Sara","Sara-ann","Saraann","Sarah","Sarajane","Saree","Sarena","Sarene","Sarette","Sari","Sarina","Sarine","Sarita","Sascha","Sasha","Sashenka","Saudra","Saundra","Savina","Sayre","Scarlet","Scarlett","Sean","Seana","Seka","Sela","Selena","Selene","Selestina","Selia","Selie","Selina","Selinda","Seline","Sella","Selle","Selma","Sena","Sephira","Serena","Serene","Shae","Shaina","Shaine","Shalna","Shalne","Shana","Shanda","Shandee","Shandeigh","Shandie","Shandra","Shandy","Shane","Shani","Shanie","Shanna","Shannah","Shannen","Shannon","Shanon","Shanta","Shantee","Shara","Sharai","Shari","Sharia","Sharity","Sharl","Sharla","Sharleen","Sharlene","Sharline","Sharon","Sharona","Sharron","Sharyl","Shaun","Shauna","Shawn","Shawna","Shawnee","Shay","Shayla","Shaylah","Shaylyn","Shaylynn","Shayna","Shayne","Shea","Sheba","Sheela","Sheelagh","Sheelah","Sheena","Sheeree","Sheila","Sheila-kathryn","Sheilah","Shel","Shela","Shelagh","Shelba","Shelbi","Shelby","Shelia","Shell","Shelley","Shelli","Shellie","Shelly","Shena","Sher","Sheree","Sheri","Sherie","Sherill","Sherilyn","Sherline","Sherri","Sherrie","Sherry","Sherye","Sheryl","Shina","Shir","Shirl","Shirlee","Shirleen","Shirlene","Shirley","Shirline","Shoshana","Shoshanna","Siana","Sianna","Sib","Sibbie","Sibby","Sibeal","Sibel","Sibella","Sibelle","Sibilla","Sibley","Sibyl","Sibylla","Sibylle","Sidoney","Sidonia","Sidonnie","Sigrid","Sile","Sileas","Silva","Silvana","Silvia","Silvie","Simona","Simone","Simonette","Simonne","Sindee","Siobhan","Sioux","Siouxie","Sisely","Sisile","Sissie","Sissy","Siusan","Sofia","Sofie","Sondra","Sonia","Sonja","Sonni","Sonnie","Sonnnie","Sonny","Sonya","Sophey","Sophi","Sophia","Sophie","Sophronia","Sorcha","Sosanna","Stace","Stacee","Stacey","Staci","Stacia","Stacie","Stacy","Stafani","Star","Starla","Starlene","Starlin","Starr","Stefa","Stefania","Stefanie","Steffane","Steffi","Steffie","Stella","Stepha","Stephana","Stephani","Stephanie","Stephannie","Stephenie","Stephi","Stephie","Stephine","Stesha","Stevana","Stevena","Stoddard","Storm","Stormi","Stormie","Stormy","Sue","Suellen","Sukey","Suki","Sula","Sunny","Sunshine","Susan","Susana","Susanetta","Susann","Susanna","Susannah","Susanne","Susette","Susi","Susie","Susy","Suzann","Suzanna","Suzanne","Suzette","Suzi","Suzie","Suzy","Sybil","Sybila","Sybilla","Sybille","Sybyl","Sydel","Sydelle","Sydney","Sylvia","Tabatha","Tabbatha","Tabbi","Tabbie","Tabbitha","Tabby","Tabina","Tabitha","Taffy","Talia","Tallia","Tallie","Tallou","Tallulah","Tally","Talya","Talyah","Tamar","Tamara","Tamarah","Tamarra","Tamera","Tami","Tamiko","Tamma","Tammara","Tammi","Tammie","Tammy","Tamqrah","Tamra","Tana","Tandi","Tandie","Tandy","Tanhya","Tani","Tania","Tanitansy","Tansy","Tanya","Tara","Tarah","Tarra","Tarrah","Taryn","Tasha","Tasia","Tate","Tatiana","Tatiania","Tatum","Tawnya","Tawsha","Ted","Tedda","Teddi","Teddie","Teddy","Tedi","Tedra","Teena","Teirtza","Teodora","Tera","Teresa","Terese","Teresina","Teresita","Teressa","Teri","Teriann","Terra","Terri","Terrie","Terrijo","Terry","Terrye","Tersina","Terza","Tess","Tessa","Tessi","Tessie","Tessy","Thalia","Thea","Theadora","Theda","Thekla","Thelma","Theo","Theodora","Theodosia","Theresa","Therese","Theresina","Theresita","Theressa","Therine","Thia","Thomasa","Thomasin","Thomasina","Thomasine","Tiena","Tierney","Tiertza","Tiff","Tiffani","Tiffanie","Tiffany","Tiffi","Tiffie","Tiffy","Tilda","Tildi","Tildie","Tildy","Tillie","Tilly","Tim","Timi","Timmi","Timmie","Timmy","Timothea","Tina","Tine","Tiphani","Tiphanie","Tiphany","Tish","Tisha","Tobe","Tobey","Tobi","Toby","Tobye","Toinette","Toma","Tomasina","Tomasine","Tomi","Tommi","Tommie","Tommy","Toni","Tonia","Tonie","Tony","Tonya","Tonye","Tootsie","Torey","Tori","Torie","Torrie","Tory","Tova","Tove","Tracee","Tracey","Traci","Tracie","Tracy","Trenna","Tresa","Trescha","Tressa","Tricia","Trina","Trish","Trisha","Trista","Trix","Trixi","Trixie","Trixy","Truda","Trude","Trudey","Trudi","Trudie","Trudy","Trula","Tuesday","Twila","Twyla","Tybi","Tybie","Tyne","Ula","Ulla","Ulrica","Ulrika","Ulrikaumeko","Ulrike","Umeko","Una","Ursa","Ursala","Ursola","Ursula","Ursulina","Ursuline","Uta","Val","Valaree","Valaria","Vale","Valeda","Valencia","Valene","Valenka","Valentia","Valentina","Valentine","Valera","Valeria","Valerie","Valery","Valerye","Valida","Valina","Valli","Vallie","Vally","Valma","Valry","Van","Vanda","Vanessa","Vania","Vanna","Vanni","Vannie","Vanny","Vanya","Veda","Velma","Velvet","Venita","Venus","Vera","Veradis","Vere","Verena","Verene","Veriee","Verile","Verina","Verine","Verla","Verna","Vernice","Veronica","Veronika","Veronike","Veronique","Vevay","Vi","Vicki","Vickie","Vicky","Victoria","Vida","Viki","Vikki","Vikky","Vilhelmina","Vilma","Vin","Vina","Vinita","Vinni","Vinnie","Vinny","Viola","Violante","Viole","Violet","Violetta","Violette","Virgie","Virgina","Virginia","Virginie","Vita","Vitia","Vitoria","Vittoria","Viv","Viva","Vivi","Vivia","Vivian","Viviana","Vivianna","Vivianne","Vivie","Vivien","Viviene","Vivienne","Viviyan","Vivyan","Vivyanne","Vonni","Vonnie","Vonny","Vyky","Wallie","Wallis","Walliw","Wally","Waly","Wanda","Wandie","Wandis","Waneta","Wanids","Wenda","Wendeline","Wendi","Wendie","Wendy","Wendye","Wenona","Wenonah","Whitney","Wileen","Wilhelmina","Wilhelmine","Wilie","Willa","Willabella","Willamina","Willetta","Willette","Willi","Willie","Willow","Willy","Willyt","Wilma","Wilmette","Wilona","Wilone","Wilow","Windy","Wini","Winifred","Winna","Winnah","Winne","Winni","Winnie","Winnifred","Winny","Winona","Winonah","Wren","Wrennie","Wylma","Wynn","Wynne","Wynnie","Wynny","Xaviera","Xena","Xenia","Xylia","Xylina","Yalonda","Yasmeen","Yasmin","Yelena","Yetta","Yettie","Yetty","Yevette","Ynes","Ynez","Yoko","Yolanda","Yolande","Yolane","Yolanthe","Yoshi","Yoshiko","Yovonnda","Ysabel","Yvette","Yvonne","Zabrina","Zahara","Zandra","Zaneta","Zara","Zarah","Zaria","Zarla","Zea","Zelda","Zelma","Zena","Zenia","Zia","Zilvia","Zita","Zitella","Zoe","Zola","Zonda","Zondra","Zonnya","Zora","Zorah","Zorana","Zorina","Zorine","Zsazsa","Zulema","Zuzana"],exports.starWars=["Ackbar","Adi Gallia","Anakin Skywalker","Arvel Crynyd","Ayla Secura","Bail Prestor Organa","Barriss Offee","Ben Quadinaros","Beru Whitesun lars","Bib Fortuna","Biggs Darklighter","Boba Fett","Bossk","C-3PO","Chewbacca","Cliegg Lars","Cordé","Darth Maul","Darth Vader","Dexter Jettster","Dooku","Dormé","Dud Bolt","Eeth Koth","Finis Valorum","Gasgano","Greedo","Gregar Typho","Grievous","Han Solo","IG-88","Jabba Desilijic Tiure","Jango Fett","Jar Jar Binks","Jek Tono Porkins","Jocasta Nu","Ki-Adi-Mundi","Kit Fisto","Lama Su","Lando Calrissian","Leia Organa","Lobot","Luke Skywalker","Luminara Unduli","Mace Windu","Mas Amedda","Mon Mothma","Nien Nunb","Nute Gunray","Obi-Wan Kenobi","Owen Lars","Padmé Amidala","Palpatine","Plo Koon","Poggle the Lesser","Quarsh Panaka","Qui-Gon Jinn","R2-D2","R4-P17","R5-D4","Ratts Tyerel","Raymus Antilles","Ric Olié","Roos Tarpals","Rugor Nass","Saesee Tiin","San Hill","Sebulba","Shaak Ti","Shmi Skywalker","Sly Moore","Tarfful","Taun We","Tion Medon","Wat Tambor","Watto","Wedge Antilles","Wicket Systri Warrick","Wilhuff Tarkin","Yarael Poof","Yoda","Zam Wesell"],exports.uniqueNamesGenerator=a=>{const n=[...a&&a.dictionaries||i.dictionaries],l={...i,...a,length:a&&a.length||n.length,dictionaries:n};if(!a||!a.dictionaries||!a.dictionaries.length)throw new Error('A "dictionaries" array must be provided. This is a breaking change introduced starting from Unique Name Generator v4. Read more about the breaking change here: https://github.com/andreasonny83/unique-names-generator#migration-guide');return new e(l).generate()};
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 650:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "v1", ({
  enumerable: true,
  get: function () {
    return _v.default;
  }
}));
Object.defineProperty(exports, "v3", ({
  enumerable: true,
  get: function () {
    return _v2.default;
  }
}));
Object.defineProperty(exports, "v4", ({
  enumerable: true,
  get: function () {
    return _v3.default;
  }
}));
Object.defineProperty(exports, "v5", ({
  enumerable: true,
  get: function () {
    return _v4.default;
  }
}));
Object.defineProperty(exports, "NIL", ({
  enumerable: true,
  get: function () {
    return _nil.default;
  }
}));
Object.defineProperty(exports, "version", ({
  enumerable: true,
  get: function () {
    return _version.default;
  }
}));
Object.defineProperty(exports, "validate", ({
  enumerable: true,
  get: function () {
    return _validate.default;
  }
}));
Object.defineProperty(exports, "stringify", ({
  enumerable: true,
  get: function () {
    return _stringify.default;
  }
}));
Object.defineProperty(exports, "parse", ({
  enumerable: true,
  get: function () {
    return _parse.default;
  }
}));

var _v = _interopRequireDefault(__nccwpck_require__(879));

var _v2 = _interopRequireDefault(__nccwpck_require__(221));

var _v3 = _interopRequireDefault(__nccwpck_require__(854));

var _v4 = _interopRequireDefault(__nccwpck_require__(666));

var _nil = _interopRequireDefault(__nccwpck_require__(438));

var _version = _interopRequireDefault(__nccwpck_require__(340));

var _validate = _interopRequireDefault(__nccwpck_require__(575));

var _stringify = _interopRequireDefault(__nccwpck_require__(659));

var _parse = _interopRequireDefault(__nccwpck_require__(129));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 681:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _crypto = _interopRequireDefault(__nccwpck_require__(113));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function md5(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === 'string') {
    bytes = Buffer.from(bytes, 'utf8');
  }

  return _crypto.default.createHash('md5').update(bytes).digest();
}

var _default = md5;
exports["default"] = _default;

/***/ }),

/***/ 438:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = '00000000-0000-0000-0000-000000000000';
exports["default"] = _default;

/***/ }),

/***/ 129:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _validate = _interopRequireDefault(__nccwpck_require__(575));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parse(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  let v;
  const arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}

var _default = parse;
exports["default"] = _default;

/***/ }),

/***/ 801:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
exports["default"] = _default;

/***/ }),

/***/ 98:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = rng;

var _crypto = _interopRequireDefault(__nccwpck_require__(113));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate

let poolPtr = rnds8Pool.length;

function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    _crypto.default.randomFillSync(rnds8Pool);

    poolPtr = 0;
  }

  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}

/***/ }),

/***/ 554:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _crypto = _interopRequireDefault(__nccwpck_require__(113));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sha1(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === 'string') {
    bytes = Buffer.from(bytes, 'utf8');
  }

  return _crypto.default.createHash('sha1').update(bytes).digest();
}

var _default = sha1;
exports["default"] = _default;

/***/ }),

/***/ 659:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _validate = _interopRequireDefault(__nccwpck_require__(575));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  const uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

var _default = stringify;
exports["default"] = _default;

/***/ }),

/***/ 879:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _rng = _interopRequireDefault(__nccwpck_require__(98));

var _stringify = _interopRequireDefault(__nccwpck_require__(659));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html
let _nodeId;

let _clockseq; // Previous uuid creation time


let _lastMSecs = 0;
let _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  let i = buf && offset || 0;
  const b = buf || new Array(16);
  options = options || {};
  let node = options.node || _nodeId;
  let clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    const seedBytes = options.random || (options.rng || _rng.default)();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  let msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  const tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (let n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || (0, _stringify.default)(b);
}

var _default = v1;
exports["default"] = _default;

/***/ }),

/***/ 221:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _v = _interopRequireDefault(__nccwpck_require__(978));

var _md = _interopRequireDefault(__nccwpck_require__(681));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const v3 = (0, _v.default)('v3', 0x30, _md.default);
var _default = v3;
exports["default"] = _default;

/***/ }),

/***/ 978:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = _default;
exports.URL = exports.DNS = void 0;

var _stringify = _interopRequireDefault(__nccwpck_require__(659));

var _parse = _interopRequireDefault(__nccwpck_require__(129));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  const bytes = [];

  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

const DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
exports.DNS = DNS;
const URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
exports.URL = URL;

function _default(name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === 'string') {
      value = stringToBytes(value);
    }

    if (typeof namespace === 'string') {
      namespace = (0, _parse.default)(namespace);
    }

    if (namespace.length !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`


    let bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      offset = offset || 0;

      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return (0, _stringify.default)(bytes);
  } // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}

/***/ }),

/***/ 854:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _rng = _interopRequireDefault(__nccwpck_require__(98));

var _stringify = _interopRequireDefault(__nccwpck_require__(659));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function v4(options, buf, offset) {
  options = options || {};

  const rnds = options.random || (options.rng || _rng.default)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`


  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0, _stringify.default)(rnds);
}

var _default = v4;
exports["default"] = _default;

/***/ }),

/***/ 666:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _v = _interopRequireDefault(__nccwpck_require__(978));

var _sha = _interopRequireDefault(__nccwpck_require__(554));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const v5 = (0, _v.default)('v5', 0x50, _sha.default);
var _default = v5;
exports["default"] = _default;

/***/ }),

/***/ 575:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _regex = _interopRequireDefault(__nccwpck_require__(801));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validate(uuid) {
  return typeof uuid === 'string' && _regex.default.test(uuid);
}

var _default = validate;
exports["default"] = _default;

/***/ }),

/***/ 340:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _validate = _interopRequireDefault(__nccwpck_require__(575));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function version(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  return parseInt(uuid.substr(14, 1), 16);
}

var _default = version;
exports["default"] = _default;

/***/ }),

/***/ 491:
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ 113:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 361:
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 685:
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 687:
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 808:
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ 37:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 17:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 404:
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ 837:
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(722)
const { uniqueNamesGenerator, adjectives, colors, animals, names } = __nccwpck_require__(454)

try {
    const config = {
        dictionaries: [adjectives, colors, animals, names],
        separator: core.getInput('separator'),
        length: core.getInput('length'),
        style: core.getInput('style')
    }
    const output = uniqueNamesGenerator(config)
    console.log(`Generated name: ${output}`)
    core.setOutput('generated_name', output)
    core.exportVariable('generated_name', output)
} catch (error) {
    core.setFailed(error.message)
}

})();

module.exports = __webpack_exports__;
/******/ })()
;