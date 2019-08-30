/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.MsgBase = (function() {

    /**
     * Namespace MsgBase.
     * @exports MsgBase
     * @namespace
     */
    var MsgBase = {};

    MsgBase.MessageHead = (function() {

        /**
         * Properties of a MessageHead.
         * @memberof MsgBase
         * @interface IMessageHead
         * @property {number|null} [nMsgID] MessageHead nMsgID
         * @property {number|null} [nMsgLength] MessageHead nMsgLength
         * @property {Uint8Array|null} [data] MessageHead data
         */

        /**
         * Constructs a new MessageHead.
         * @memberof MsgBase
         * @classdesc Represents a MessageHead.
         * @implements IMessageHead
         * @constructor
         * @param {MsgBase.IMessageHead=} [properties] Properties to set
         */
        function MessageHead(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MessageHead nMsgID.
         * @member {number} nMsgID
         * @memberof MsgBase.MessageHead
         * @instance
         */
        MessageHead.prototype.nMsgID = 0;

        /**
         * MessageHead nMsgLength.
         * @member {number} nMsgLength
         * @memberof MsgBase.MessageHead
         * @instance
         */
        MessageHead.prototype.nMsgLength = 0;

        /**
         * MessageHead data.
         * @member {Uint8Array} data
         * @memberof MsgBase.MessageHead
         * @instance
         */
        MessageHead.prototype.data = $util.newBuffer([]);

        /**
         * Creates a new MessageHead instance using the specified properties.
         * @function create
         * @memberof MsgBase.MessageHead
         * @static
         * @param {MsgBase.IMessageHead=} [properties] Properties to set
         * @returns {MsgBase.MessageHead} MessageHead instance
         */
        MessageHead.create = function create(properties) {
            return new MessageHead(properties);
        };

        /**
         * Encodes the specified MessageHead message. Does not implicitly {@link MsgBase.MessageHead.verify|verify} messages.
         * @function encode
         * @memberof MsgBase.MessageHead
         * @static
         * @param {MsgBase.IMessageHead} message MessageHead message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageHead.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.nMsgID != null && message.hasOwnProperty("nMsgID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.nMsgID);
            if (message.nMsgLength != null && message.hasOwnProperty("nMsgLength"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.nMsgLength);
            if (message.data != null && message.hasOwnProperty("data"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.data);
            return writer;
        };

        /**
         * Encodes the specified MessageHead message, length delimited. Does not implicitly {@link MsgBase.MessageHead.verify|verify} messages.
         * @function encodeDelimited
         * @memberof MsgBase.MessageHead
         * @static
         * @param {MsgBase.IMessageHead} message MessageHead message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageHead.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MessageHead message from the specified reader or buffer.
         * @function decode
         * @memberof MsgBase.MessageHead
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {MsgBase.MessageHead} MessageHead
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageHead.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MsgBase.MessageHead();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.nMsgID = reader.int32();
                    break;
                case 2:
                    message.nMsgLength = reader.int32();
                    break;
                case 3:
                    message.data = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MessageHead message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof MsgBase.MessageHead
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {MsgBase.MessageHead} MessageHead
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageHead.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        return MessageHead;
    })();

    return MsgBase;
})();

$root.MsgGSC = (function() {

    /**
     * Namespace MsgGSC.
     * @exports MsgGSC
     * @namespace
     */
    var MsgGSC = {};

    MsgGSC.C2GSConnect = (function() {

        /**
         * Properties of a C2GSConnect.
         * @memberof MsgGSC
         * @interface IC2GSConnect
         * @property {string|null} [ip] C2GSConnect ip
         * @property {string|null} [gameVersion] C2GSConnect gameVersion
         */

        /**
         * Constructs a new C2GSConnect.
         * @memberof MsgGSC
         * @classdesc Represents a C2GSConnect.
         * @implements IC2GSConnect
         * @constructor
         * @param {MsgGSC.IC2GSConnect=} [properties] Properties to set
         */
        function C2GSConnect(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * C2GSConnect ip.
         * @member {string} ip
         * @memberof MsgGSC.C2GSConnect
         * @instance
         */
        C2GSConnect.prototype.ip = "";

        /**
         * C2GSConnect gameVersion.
         * @member {string} gameVersion
         * @memberof MsgGSC.C2GSConnect
         * @instance
         */
        C2GSConnect.prototype.gameVersion = "";

        /**
         * Creates a new C2GSConnect instance using the specified properties.
         * @function create
         * @memberof MsgGSC.C2GSConnect
         * @static
         * @param {MsgGSC.IC2GSConnect=} [properties] Properties to set
         * @returns {MsgGSC.C2GSConnect} C2GSConnect instance
         */
        C2GSConnect.create = function create(properties) {
            return new C2GSConnect(properties);
        };

        /**
         * Encodes the specified C2GSConnect message. Does not implicitly {@link MsgGSC.C2GSConnect.verify|verify} messages.
         * @function encode
         * @memberof MsgGSC.C2GSConnect
         * @static
         * @param {MsgGSC.IC2GSConnect} message C2GSConnect message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2GSConnect.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.ip != null && message.hasOwnProperty("ip"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.ip);
            if (message.gameVersion != null && message.hasOwnProperty("gameVersion"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.gameVersion);
            return writer;
        };

        /**
         * Encodes the specified C2GSConnect message, length delimited. Does not implicitly {@link MsgGSC.C2GSConnect.verify|verify} messages.
         * @function encodeDelimited
         * @memberof MsgGSC.C2GSConnect
         * @static
         * @param {MsgGSC.IC2GSConnect} message C2GSConnect message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2GSConnect.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2GSConnect message from the specified reader or buffer.
         * @function decode
         * @memberof MsgGSC.C2GSConnect
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {MsgGSC.C2GSConnect} C2GSConnect
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2GSConnect.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MsgGSC.C2GSConnect();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.ip = reader.string();
                    break;
                case 2:
                    message.gameVersion = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2GSConnect message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof MsgGSC.C2GSConnect
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {MsgGSC.C2GSConnect} C2GSConnect
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2GSConnect.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        return C2GSConnect;
    })();

    MsgGSC.GS2CConnect = (function() {

        /**
         * Properties of a GS2CConnect.
         * @memberof MsgGSC
         * @interface IGS2CConnect
         * @property {boolean|null} [success] GS2CConnect success
         */

        /**
         * Constructs a new GS2CConnect.
         * @memberof MsgGSC
         * @classdesc Represents a GS2CConnect.
         * @implements IGS2CConnect
         * @constructor
         * @param {MsgGSC.IGS2CConnect=} [properties] Properties to set
         */
        function GS2CConnect(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GS2CConnect success.
         * @member {boolean} success
         * @memberof MsgGSC.GS2CConnect
         * @instance
         */
        GS2CConnect.prototype.success = false;

        /**
         * Creates a new GS2CConnect instance using the specified properties.
         * @function create
         * @memberof MsgGSC.GS2CConnect
         * @static
         * @param {MsgGSC.IGS2CConnect=} [properties] Properties to set
         * @returns {MsgGSC.GS2CConnect} GS2CConnect instance
         */
        GS2CConnect.create = function create(properties) {
            return new GS2CConnect(properties);
        };

        /**
         * Encodes the specified GS2CConnect message. Does not implicitly {@link MsgGSC.GS2CConnect.verify|verify} messages.
         * @function encode
         * @memberof MsgGSC.GS2CConnect
         * @static
         * @param {MsgGSC.IGS2CConnect} message GS2CConnect message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GS2CConnect.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.success != null && message.hasOwnProperty("success"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
            return writer;
        };

        /**
         * Encodes the specified GS2CConnect message, length delimited. Does not implicitly {@link MsgGSC.GS2CConnect.verify|verify} messages.
         * @function encodeDelimited
         * @memberof MsgGSC.GS2CConnect
         * @static
         * @param {MsgGSC.IGS2CConnect} message GS2CConnect message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GS2CConnect.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GS2CConnect message from the specified reader or buffer.
         * @function decode
         * @memberof MsgGSC.GS2CConnect
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {MsgGSC.GS2CConnect} GS2CConnect
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GS2CConnect.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MsgGSC.GS2CConnect();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.success = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GS2CConnect message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof MsgGSC.GS2CConnect
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {MsgGSC.GS2CConnect} GS2CConnect
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GS2CConnect.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        return GS2CConnect;
    })();

    return MsgGSC;
})();

$root.MsgLC = (function() {

    /**
     * Namespace MsgLC.
     * @exports MsgLC
     * @namespace
     */
    var MsgLC = {};

    MsgLC.C2LLogin = (function() {

        /**
         * Properties of a C2LLogin.
         * @memberof MsgLC
         * @interface IC2LLogin
         * @property {string|null} [sAccount] C2LLogin sAccount
         * @property {string|null} [sPassword] C2LLogin sPassword
         */

        /**
         * Constructs a new C2LLogin.
         * @memberof MsgLC
         * @classdesc Represents a C2LLogin.
         * @implements IC2LLogin
         * @constructor
         * @param {MsgLC.IC2LLogin=} [properties] Properties to set
         */
        function C2LLogin(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * C2LLogin sAccount.
         * @member {string} sAccount
         * @memberof MsgLC.C2LLogin
         * @instance
         */
        C2LLogin.prototype.sAccount = "";

        /**
         * C2LLogin sPassword.
         * @member {string} sPassword
         * @memberof MsgLC.C2LLogin
         * @instance
         */
        C2LLogin.prototype.sPassword = "";

        /**
         * Creates a new C2LLogin instance using the specified properties.
         * @function create
         * @memberof MsgLC.C2LLogin
         * @static
         * @param {MsgLC.IC2LLogin=} [properties] Properties to set
         * @returns {MsgLC.C2LLogin} C2LLogin instance
         */
        C2LLogin.create = function create(properties) {
            return new C2LLogin(properties);
        };

        /**
         * Encodes the specified C2LLogin message. Does not implicitly {@link MsgLC.C2LLogin.verify|verify} messages.
         * @function encode
         * @memberof MsgLC.C2LLogin
         * @static
         * @param {MsgLC.IC2LLogin} message C2LLogin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2LLogin.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.sAccount != null && message.hasOwnProperty("sAccount"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.sAccount);
            if (message.sPassword != null && message.hasOwnProperty("sPassword"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.sPassword);
            return writer;
        };

        /**
         * Encodes the specified C2LLogin message, length delimited. Does not implicitly {@link MsgLC.C2LLogin.verify|verify} messages.
         * @function encodeDelimited
         * @memberof MsgLC.C2LLogin
         * @static
         * @param {MsgLC.IC2LLogin} message C2LLogin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2LLogin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2LLogin message from the specified reader or buffer.
         * @function decode
         * @memberof MsgLC.C2LLogin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {MsgLC.C2LLogin} C2LLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2LLogin.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MsgLC.C2LLogin();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.sAccount = reader.string();
                    break;
                case 2:
                    message.sPassword = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2LLogin message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof MsgLC.C2LLogin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {MsgLC.C2LLogin} C2LLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2LLogin.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        return C2LLogin;
    })();

    MsgLC.L2CLogin = (function() {

        /**
         * Properties of a L2CLogin.
         * @memberof MsgLC
         * @interface IL2CLogin
         * @property {boolean|null} [bNeedCreate] L2CLogin bNeedCreate
         */

        /**
         * Constructs a new L2CLogin.
         * @memberof MsgLC
         * @classdesc Represents a L2CLogin.
         * @implements IL2CLogin
         * @constructor
         * @param {MsgLC.IL2CLogin=} [properties] Properties to set
         */
        function L2CLogin(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * L2CLogin bNeedCreate.
         * @member {boolean} bNeedCreate
         * @memberof MsgLC.L2CLogin
         * @instance
         */
        L2CLogin.prototype.bNeedCreate = false;

        /**
         * Creates a new L2CLogin instance using the specified properties.
         * @function create
         * @memberof MsgLC.L2CLogin
         * @static
         * @param {MsgLC.IL2CLogin=} [properties] Properties to set
         * @returns {MsgLC.L2CLogin} L2CLogin instance
         */
        L2CLogin.create = function create(properties) {
            return new L2CLogin(properties);
        };

        /**
         * Encodes the specified L2CLogin message. Does not implicitly {@link MsgLC.L2CLogin.verify|verify} messages.
         * @function encode
         * @memberof MsgLC.L2CLogin
         * @static
         * @param {MsgLC.IL2CLogin} message L2CLogin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        L2CLogin.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.bNeedCreate != null && message.hasOwnProperty("bNeedCreate"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.bNeedCreate);
            return writer;
        };

        /**
         * Encodes the specified L2CLogin message, length delimited. Does not implicitly {@link MsgLC.L2CLogin.verify|verify} messages.
         * @function encodeDelimited
         * @memberof MsgLC.L2CLogin
         * @static
         * @param {MsgLC.IL2CLogin} message L2CLogin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        L2CLogin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a L2CLogin message from the specified reader or buffer.
         * @function decode
         * @memberof MsgLC.L2CLogin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {MsgLC.L2CLogin} L2CLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        L2CLogin.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MsgLC.L2CLogin();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.bNeedCreate = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a L2CLogin message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof MsgLC.L2CLogin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {MsgLC.L2CLogin} L2CLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        L2CLogin.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        return L2CLogin;
    })();

    return MsgLC;
})();

$root.MsgLGS = (function() {

    /**
     * Namespace MsgLGS.
     * @exports MsgLGS
     * @namespace
     */
    var MsgLGS = {};

    MsgLGS.GS2LConnectAuth = (function() {

        /**
         * Properties of a GS2LConnectAuth.
         * @memberof MsgLGS
         * @interface IGS2LConnectAuth
         * @property {string|null} [ip] GS2LConnectAuth ip
         * @property {number|null} [serverId] GS2LConnectAuth serverId
         * @property {string|null} [serverName] GS2LConnectAuth serverName
         */

        /**
         * Constructs a new GS2LConnectAuth.
         * @memberof MsgLGS
         * @classdesc Represents a GS2LConnectAuth.
         * @implements IGS2LConnectAuth
         * @constructor
         * @param {MsgLGS.IGS2LConnectAuth=} [properties] Properties to set
         */
        function GS2LConnectAuth(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GS2LConnectAuth ip.
         * @member {string} ip
         * @memberof MsgLGS.GS2LConnectAuth
         * @instance
         */
        GS2LConnectAuth.prototype.ip = "";

        /**
         * GS2LConnectAuth serverId.
         * @member {number} serverId
         * @memberof MsgLGS.GS2LConnectAuth
         * @instance
         */
        GS2LConnectAuth.prototype.serverId = 0;

        /**
         * GS2LConnectAuth serverName.
         * @member {string} serverName
         * @memberof MsgLGS.GS2LConnectAuth
         * @instance
         */
        GS2LConnectAuth.prototype.serverName = "";

        /**
         * Creates a new GS2LConnectAuth instance using the specified properties.
         * @function create
         * @memberof MsgLGS.GS2LConnectAuth
         * @static
         * @param {MsgLGS.IGS2LConnectAuth=} [properties] Properties to set
         * @returns {MsgLGS.GS2LConnectAuth} GS2LConnectAuth instance
         */
        GS2LConnectAuth.create = function create(properties) {
            return new GS2LConnectAuth(properties);
        };

        /**
         * Encodes the specified GS2LConnectAuth message. Does not implicitly {@link MsgLGS.GS2LConnectAuth.verify|verify} messages.
         * @function encode
         * @memberof MsgLGS.GS2LConnectAuth
         * @static
         * @param {MsgLGS.IGS2LConnectAuth} message GS2LConnectAuth message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GS2LConnectAuth.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.ip != null && message.hasOwnProperty("ip"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.ip);
            if (message.serverId != null && message.hasOwnProperty("serverId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.serverId);
            if (message.serverName != null && message.hasOwnProperty("serverName"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.serverName);
            return writer;
        };

        /**
         * Encodes the specified GS2LConnectAuth message, length delimited. Does not implicitly {@link MsgLGS.GS2LConnectAuth.verify|verify} messages.
         * @function encodeDelimited
         * @memberof MsgLGS.GS2LConnectAuth
         * @static
         * @param {MsgLGS.IGS2LConnectAuth} message GS2LConnectAuth message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GS2LConnectAuth.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GS2LConnectAuth message from the specified reader or buffer.
         * @function decode
         * @memberof MsgLGS.GS2LConnectAuth
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {MsgLGS.GS2LConnectAuth} GS2LConnectAuth
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GS2LConnectAuth.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MsgLGS.GS2LConnectAuth();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.ip = reader.string();
                    break;
                case 2:
                    message.serverId = reader.int32();
                    break;
                case 3:
                    message.serverName = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GS2LConnectAuth message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof MsgLGS.GS2LConnectAuth
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {MsgLGS.GS2LConnectAuth} GS2LConnectAuth
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GS2LConnectAuth.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        return GS2LConnectAuth;
    })();

    MsgLGS.L2GSConnectAuth = (function() {

        /**
         * Properties of a L2GSConnectAuth.
         * @memberof MsgLGS
         * @interface IL2GSConnectAuth
         * @property {boolean|null} [success] L2GSConnectAuth success
         */

        /**
         * Constructs a new L2GSConnectAuth.
         * @memberof MsgLGS
         * @classdesc Represents a L2GSConnectAuth.
         * @implements IL2GSConnectAuth
         * @constructor
         * @param {MsgLGS.IL2GSConnectAuth=} [properties] Properties to set
         */
        function L2GSConnectAuth(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * L2GSConnectAuth success.
         * @member {boolean} success
         * @memberof MsgLGS.L2GSConnectAuth
         * @instance
         */
        L2GSConnectAuth.prototype.success = false;

        /**
         * Creates a new L2GSConnectAuth instance using the specified properties.
         * @function create
         * @memberof MsgLGS.L2GSConnectAuth
         * @static
         * @param {MsgLGS.IL2GSConnectAuth=} [properties] Properties to set
         * @returns {MsgLGS.L2GSConnectAuth} L2GSConnectAuth instance
         */
        L2GSConnectAuth.create = function create(properties) {
            return new L2GSConnectAuth(properties);
        };

        /**
         * Encodes the specified L2GSConnectAuth message. Does not implicitly {@link MsgLGS.L2GSConnectAuth.verify|verify} messages.
         * @function encode
         * @memberof MsgLGS.L2GSConnectAuth
         * @static
         * @param {MsgLGS.IL2GSConnectAuth} message L2GSConnectAuth message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        L2GSConnectAuth.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.success != null && message.hasOwnProperty("success"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
            return writer;
        };

        /**
         * Encodes the specified L2GSConnectAuth message, length delimited. Does not implicitly {@link MsgLGS.L2GSConnectAuth.verify|verify} messages.
         * @function encodeDelimited
         * @memberof MsgLGS.L2GSConnectAuth
         * @static
         * @param {MsgLGS.IL2GSConnectAuth} message L2GSConnectAuth message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        L2GSConnectAuth.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a L2GSConnectAuth message from the specified reader or buffer.
         * @function decode
         * @memberof MsgLGS.L2GSConnectAuth
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {MsgLGS.L2GSConnectAuth} L2GSConnectAuth
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        L2GSConnectAuth.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MsgLGS.L2GSConnectAuth();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.success = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a L2GSConnectAuth message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof MsgLGS.L2GSConnectAuth
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {MsgLGS.L2GSConnectAuth} L2GSConnectAuth
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        L2GSConnectAuth.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        return L2GSConnectAuth;
    })();

    return MsgLGS;
})();

$root.TestPackage2 = (function() {

    /**
     * Namespace TestPackage2.
     * @exports TestPackage2
     * @namespace
     */
    var TestPackage2 = {};

    TestPackage2.People = (function() {

        /**
         * Properties of a People.
         * @memberof TestPackage2
         * @interface IPeople
         * @property {string|null} [sName] People sName
         * @property {number|null} [nAge] People nAge
         * @property {TestPackage2.People.eTypes|null} [PeopleType] People PeopleType
         */

        /**
         * Constructs a new People.
         * @memberof TestPackage2
         * @classdesc Represents a People.
         * @implements IPeople
         * @constructor
         * @param {TestPackage2.IPeople=} [properties] Properties to set
         */
        function People(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * People sName.
         * @member {string} sName
         * @memberof TestPackage2.People
         * @instance
         */
        People.prototype.sName = "";

        /**
         * People nAge.
         * @member {number} nAge
         * @memberof TestPackage2.People
         * @instance
         */
        People.prototype.nAge = 0;

        /**
         * People PeopleType.
         * @member {TestPackage2.People.eTypes} PeopleType
         * @memberof TestPackage2.People
         * @instance
         */
        People.prototype.PeopleType = 0;

        /**
         * Creates a new People instance using the specified properties.
         * @function create
         * @memberof TestPackage2.People
         * @static
         * @param {TestPackage2.IPeople=} [properties] Properties to set
         * @returns {TestPackage2.People} People instance
         */
        People.create = function create(properties) {
            return new People(properties);
        };

        /**
         * Encodes the specified People message. Does not implicitly {@link TestPackage2.People.verify|verify} messages.
         * @function encode
         * @memberof TestPackage2.People
         * @static
         * @param {TestPackage2.IPeople} message People message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        People.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.sName != null && message.hasOwnProperty("sName"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.sName);
            if (message.nAge != null && message.hasOwnProperty("nAge"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.nAge);
            if (message.PeopleType != null && message.hasOwnProperty("PeopleType"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.PeopleType);
            return writer;
        };

        /**
         * Encodes the specified People message, length delimited. Does not implicitly {@link TestPackage2.People.verify|verify} messages.
         * @function encodeDelimited
         * @memberof TestPackage2.People
         * @static
         * @param {TestPackage2.IPeople} message People message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        People.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a People message from the specified reader or buffer.
         * @function decode
         * @memberof TestPackage2.People
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {TestPackage2.People} People
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        People.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.TestPackage2.People();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.sName = reader.string();
                    break;
                case 2:
                    message.nAge = reader.int32();
                    break;
                case 3:
                    message.PeopleType = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a People message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof TestPackage2.People
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {TestPackage2.People} People
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        People.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * eTypes enum.
         * @name TestPackage2.People.eTypes
         * @enum {string}
         * @property {number} e_NULL=0 e_NULL value
         * @property {number} e_Mom=1 e_Mom value
         * @property {number} e_Dad=2 e_Dad value
         * @property {number} e_End=3 e_End value
         */
        People.eTypes = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "e_NULL"] = 0;
            values[valuesById[1] = "e_Mom"] = 1;
            values[valuesById[2] = "e_Dad"] = 2;
            values[valuesById[3] = "e_End"] = 3;
            return values;
        })();

        return People;
    })();

    TestPackage2.Parent = (function() {

        /**
         * Properties of a Parent.
         * @memberof TestPackage2
         * @interface IParent
         * @property {TestPackage2.IPeople|null} [person] Parent person
         * @property {string|null} [sComment] Parent sComment
         */

        /**
         * Constructs a new Parent.
         * @memberof TestPackage2
         * @classdesc Represents a Parent.
         * @implements IParent
         * @constructor
         * @param {TestPackage2.IParent=} [properties] Properties to set
         */
        function Parent(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Parent person.
         * @member {TestPackage2.IPeople|null|undefined} person
         * @memberof TestPackage2.Parent
         * @instance
         */
        Parent.prototype.person = null;

        /**
         * Parent sComment.
         * @member {string} sComment
         * @memberof TestPackage2.Parent
         * @instance
         */
        Parent.prototype.sComment = "";

        /**
         * Creates a new Parent instance using the specified properties.
         * @function create
         * @memberof TestPackage2.Parent
         * @static
         * @param {TestPackage2.IParent=} [properties] Properties to set
         * @returns {TestPackage2.Parent} Parent instance
         */
        Parent.create = function create(properties) {
            return new Parent(properties);
        };

        /**
         * Encodes the specified Parent message. Does not implicitly {@link TestPackage2.Parent.verify|verify} messages.
         * @function encode
         * @memberof TestPackage2.Parent
         * @static
         * @param {TestPackage2.IParent} message Parent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Parent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.person != null && message.hasOwnProperty("person"))
                $root.TestPackage2.People.encode(message.person, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.sComment != null && message.hasOwnProperty("sComment"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.sComment);
            return writer;
        };

        /**
         * Encodes the specified Parent message, length delimited. Does not implicitly {@link TestPackage2.Parent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof TestPackage2.Parent
         * @static
         * @param {TestPackage2.IParent} message Parent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Parent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Parent message from the specified reader or buffer.
         * @function decode
         * @memberof TestPackage2.Parent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {TestPackage2.Parent} Parent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Parent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.TestPackage2.Parent();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.person = $root.TestPackage2.People.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.sComment = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Parent message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof TestPackage2.Parent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {TestPackage2.Parent} Parent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Parent.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        return Parent;
    })();

    return TestPackage2;
})();

module.exports = $root;
