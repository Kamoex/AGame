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

    /**
     * EServerState enum.
     * @name MsgBase.EServerState
     * @enum {string}
     * @property {number} ENULL=0 ENULL value
     * @property {number} EOPEN=1 EOPEN value
     * @property {number} EOCLOSE=2 EOCLOSE value
     */
    MsgBase.EServerState = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "ENULL"] = 0;
        values[valuesById[1] = "EOPEN"] = 1;
        values[valuesById[2] = "EOCLOSE"] = 2;
        return values;
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

    MsgLC.ServerInfo = (function() {

        /**
         * Properties of a ServerInfo.
         * @memberof MsgLC
         * @interface IServerInfo
         * @property {number|null} [nID] ServerInfo nID
         * @property {string|null} [sName] ServerInfo sName
         * @property {string|null} [sIp] ServerInfo sIp
         * @property {number|null} [nPort] ServerInfo nPort
         * @property {MsgBase.EServerState|null} [eState] ServerInfo eState
         */

        /**
         * Constructs a new ServerInfo.
         * @memberof MsgLC
         * @classdesc Represents a ServerInfo.
         * @implements IServerInfo
         * @constructor
         * @param {MsgLC.IServerInfo=} [properties] Properties to set
         */
        function ServerInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ServerInfo nID.
         * @member {number} nID
         * @memberof MsgLC.ServerInfo
         * @instance
         */
        ServerInfo.prototype.nID = 0;

        /**
         * ServerInfo sName.
         * @member {string} sName
         * @memberof MsgLC.ServerInfo
         * @instance
         */
        ServerInfo.prototype.sName = "";

        /**
         * ServerInfo sIp.
         * @member {string} sIp
         * @memberof MsgLC.ServerInfo
         * @instance
         */
        ServerInfo.prototype.sIp = "";

        /**
         * ServerInfo nPort.
         * @member {number} nPort
         * @memberof MsgLC.ServerInfo
         * @instance
         */
        ServerInfo.prototype.nPort = 0;

        /**
         * ServerInfo eState.
         * @member {MsgBase.EServerState} eState
         * @memberof MsgLC.ServerInfo
         * @instance
         */
        ServerInfo.prototype.eState = 0;

        /**
         * Creates a new ServerInfo instance using the specified properties.
         * @function create
         * @memberof MsgLC.ServerInfo
         * @static
         * @param {MsgLC.IServerInfo=} [properties] Properties to set
         * @returns {MsgLC.ServerInfo} ServerInfo instance
         */
        ServerInfo.create = function create(properties) {
            return new ServerInfo(properties);
        };

        /**
         * Encodes the specified ServerInfo message. Does not implicitly {@link MsgLC.ServerInfo.verify|verify} messages.
         * @function encode
         * @memberof MsgLC.ServerInfo
         * @static
         * @param {MsgLC.IServerInfo} message ServerInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServerInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.nID != null && message.hasOwnProperty("nID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.nID);
            if (message.sName != null && message.hasOwnProperty("sName"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.sName);
            if (message.sIp != null && message.hasOwnProperty("sIp"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.sIp);
            if (message.nPort != null && message.hasOwnProperty("nPort"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.nPort);
            if (message.eState != null && message.hasOwnProperty("eState"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.eState);
            return writer;
        };

        /**
         * Encodes the specified ServerInfo message, length delimited. Does not implicitly {@link MsgLC.ServerInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof MsgLC.ServerInfo
         * @static
         * @param {MsgLC.IServerInfo} message ServerInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServerInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ServerInfo message from the specified reader or buffer.
         * @function decode
         * @memberof MsgLC.ServerInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {MsgLC.ServerInfo} ServerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServerInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MsgLC.ServerInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.nID = reader.int32();
                    break;
                case 2:
                    message.sName = reader.string();
                    break;
                case 3:
                    message.sIp = reader.string();
                    break;
                case 4:
                    message.nPort = reader.int32();
                    break;
                case 5:
                    message.eState = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ServerInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof MsgLC.ServerInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {MsgLC.ServerInfo} ServerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServerInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        return ServerInfo;
    })();

    MsgLC.L2CServerInfo = (function() {

        /**
         * Properties of a L2CServerInfo.
         * @memberof MsgLC
         * @interface IL2CServerInfo
         * @property {Array.<MsgLC.IServerInfo>|null} [serverInfos] L2CServerInfo serverInfos
         */

        /**
         * Constructs a new L2CServerInfo.
         * @memberof MsgLC
         * @classdesc Represents a L2CServerInfo.
         * @implements IL2CServerInfo
         * @constructor
         * @param {MsgLC.IL2CServerInfo=} [properties] Properties to set
         */
        function L2CServerInfo(properties) {
            this.serverInfos = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * L2CServerInfo serverInfos.
         * @member {Array.<MsgLC.IServerInfo>} serverInfos
         * @memberof MsgLC.L2CServerInfo
         * @instance
         */
        L2CServerInfo.prototype.serverInfos = $util.emptyArray;

        /**
         * Creates a new L2CServerInfo instance using the specified properties.
         * @function create
         * @memberof MsgLC.L2CServerInfo
         * @static
         * @param {MsgLC.IL2CServerInfo=} [properties] Properties to set
         * @returns {MsgLC.L2CServerInfo} L2CServerInfo instance
         */
        L2CServerInfo.create = function create(properties) {
            return new L2CServerInfo(properties);
        };

        /**
         * Encodes the specified L2CServerInfo message. Does not implicitly {@link MsgLC.L2CServerInfo.verify|verify} messages.
         * @function encode
         * @memberof MsgLC.L2CServerInfo
         * @static
         * @param {MsgLC.IL2CServerInfo} message L2CServerInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        L2CServerInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.serverInfos != null && message.serverInfos.length)
                for (var i = 0; i < message.serverInfos.length; ++i)
                    $root.MsgLC.ServerInfo.encode(message.serverInfos[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified L2CServerInfo message, length delimited. Does not implicitly {@link MsgLC.L2CServerInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof MsgLC.L2CServerInfo
         * @static
         * @param {MsgLC.IL2CServerInfo} message L2CServerInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        L2CServerInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a L2CServerInfo message from the specified reader or buffer.
         * @function decode
         * @memberof MsgLC.L2CServerInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {MsgLC.L2CServerInfo} L2CServerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        L2CServerInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MsgLC.L2CServerInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.serverInfos && message.serverInfos.length))
                        message.serverInfos = [];
                    message.serverInfos.push($root.MsgLC.ServerInfo.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a L2CServerInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof MsgLC.L2CServerInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {MsgLC.L2CServerInfo} L2CServerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        L2CServerInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        return L2CServerInfo;
    })();

    MsgLC.SimRoleInfo = (function() {

        /**
         * Properties of a SimRoleInfo.
         * @memberof MsgLC
         * @interface ISimRoleInfo
         * @property {number|null} [nID] SimRoleInfo nID
         * @property {string|null} [sName] SimRoleInfo sName
         */

        /**
         * Constructs a new SimRoleInfo.
         * @memberof MsgLC
         * @classdesc Represents a SimRoleInfo.
         * @implements ISimRoleInfo
         * @constructor
         * @param {MsgLC.ISimRoleInfo=} [properties] Properties to set
         */
        function SimRoleInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SimRoleInfo nID.
         * @member {number} nID
         * @memberof MsgLC.SimRoleInfo
         * @instance
         */
        SimRoleInfo.prototype.nID = 0;

        /**
         * SimRoleInfo sName.
         * @member {string} sName
         * @memberof MsgLC.SimRoleInfo
         * @instance
         */
        SimRoleInfo.prototype.sName = "";

        /**
         * Creates a new SimRoleInfo instance using the specified properties.
         * @function create
         * @memberof MsgLC.SimRoleInfo
         * @static
         * @param {MsgLC.ISimRoleInfo=} [properties] Properties to set
         * @returns {MsgLC.SimRoleInfo} SimRoleInfo instance
         */
        SimRoleInfo.create = function create(properties) {
            return new SimRoleInfo(properties);
        };

        /**
         * Encodes the specified SimRoleInfo message. Does not implicitly {@link MsgLC.SimRoleInfo.verify|verify} messages.
         * @function encode
         * @memberof MsgLC.SimRoleInfo
         * @static
         * @param {MsgLC.ISimRoleInfo} message SimRoleInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SimRoleInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.nID != null && message.hasOwnProperty("nID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.nID);
            if (message.sName != null && message.hasOwnProperty("sName"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.sName);
            return writer;
        };

        /**
         * Encodes the specified SimRoleInfo message, length delimited. Does not implicitly {@link MsgLC.SimRoleInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof MsgLC.SimRoleInfo
         * @static
         * @param {MsgLC.ISimRoleInfo} message SimRoleInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SimRoleInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SimRoleInfo message from the specified reader or buffer.
         * @function decode
         * @memberof MsgLC.SimRoleInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {MsgLC.SimRoleInfo} SimRoleInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SimRoleInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MsgLC.SimRoleInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.nID = reader.int32();
                    break;
                case 2:
                    message.sName = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SimRoleInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof MsgLC.SimRoleInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {MsgLC.SimRoleInfo} SimRoleInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SimRoleInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        return SimRoleInfo;
    })();

    MsgLC.C2LLogin = (function() {

        /**
         * Properties of a C2LLogin.
         * @memberof MsgLC
         * @interface IC2LLogin
         * @property {number|null} [nChannelID] C2LLogin nChannelID
         * @property {string|null} [sToken] C2LLogin sToken
         * @property {string|null} [sAccount] C2LLogin sAccount
         * @property {string|null} [sPassword] C2LLogin sPassword
         * @property {string|null} [sVersion] C2LLogin sVersion
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
         * C2LLogin nChannelID.
         * @member {number} nChannelID
         * @memberof MsgLC.C2LLogin
         * @instance
         */
        C2LLogin.prototype.nChannelID = 0;

        /**
         * C2LLogin sToken.
         * @member {string} sToken
         * @memberof MsgLC.C2LLogin
         * @instance
         */
        C2LLogin.prototype.sToken = "";

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
         * C2LLogin sVersion.
         * @member {string} sVersion
         * @memberof MsgLC.C2LLogin
         * @instance
         */
        C2LLogin.prototype.sVersion = "";

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
            if (message.nChannelID != null && message.hasOwnProperty("nChannelID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.nChannelID);
            if (message.sToken != null && message.hasOwnProperty("sToken"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.sToken);
            if (message.sAccount != null && message.hasOwnProperty("sAccount"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.sAccount);
            if (message.sPassword != null && message.hasOwnProperty("sPassword"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.sPassword);
            if (message.sVersion != null && message.hasOwnProperty("sVersion"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.sVersion);
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
                    message.nChannelID = reader.int32();
                    break;
                case 2:
                    message.sToken = reader.string();
                    break;
                case 3:
                    message.sAccount = reader.string();
                    break;
                case 4:
                    message.sPassword = reader.string();
                    break;
                case 5:
                    message.sVersion = reader.string();
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
         * @property {MsgLC.ISimRoleInfo|null} [roleInfo] L2CLogin roleInfo
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
         * L2CLogin roleInfo.
         * @member {MsgLC.ISimRoleInfo|null|undefined} roleInfo
         * @memberof MsgLC.L2CLogin
         * @instance
         */
        L2CLogin.prototype.roleInfo = null;

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
            if (message.roleInfo != null && message.hasOwnProperty("roleInfo"))
                $root.MsgLC.SimRoleInfo.encode(message.roleInfo, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
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
                case 2:
                    message.roleInfo = $root.MsgLC.SimRoleInfo.decode(reader, reader.uint32());
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

    MsgLGS.L2GSConnectSuccess = (function() {

        /**
         * Properties of a L2GSConnectSuccess.
         * @memberof MsgLGS
         * @interface IL2GSConnectSuccess
         */

        /**
         * Constructs a new L2GSConnectSuccess.
         * @memberof MsgLGS
         * @classdesc Represents a L2GSConnectSuccess.
         * @implements IL2GSConnectSuccess
         * @constructor
         * @param {MsgLGS.IL2GSConnectSuccess=} [properties] Properties to set
         */
        function L2GSConnectSuccess(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new L2GSConnectSuccess instance using the specified properties.
         * @function create
         * @memberof MsgLGS.L2GSConnectSuccess
         * @static
         * @param {MsgLGS.IL2GSConnectSuccess=} [properties] Properties to set
         * @returns {MsgLGS.L2GSConnectSuccess} L2GSConnectSuccess instance
         */
        L2GSConnectSuccess.create = function create(properties) {
            return new L2GSConnectSuccess(properties);
        };

        /**
         * Encodes the specified L2GSConnectSuccess message. Does not implicitly {@link MsgLGS.L2GSConnectSuccess.verify|verify} messages.
         * @function encode
         * @memberof MsgLGS.L2GSConnectSuccess
         * @static
         * @param {MsgLGS.IL2GSConnectSuccess} message L2GSConnectSuccess message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        L2GSConnectSuccess.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified L2GSConnectSuccess message, length delimited. Does not implicitly {@link MsgLGS.L2GSConnectSuccess.verify|verify} messages.
         * @function encodeDelimited
         * @memberof MsgLGS.L2GSConnectSuccess
         * @static
         * @param {MsgLGS.IL2GSConnectSuccess} message L2GSConnectSuccess message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        L2GSConnectSuccess.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a L2GSConnectSuccess message from the specified reader or buffer.
         * @function decode
         * @memberof MsgLGS.L2GSConnectSuccess
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {MsgLGS.L2GSConnectSuccess} L2GSConnectSuccess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        L2GSConnectSuccess.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MsgLGS.L2GSConnectSuccess();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a L2GSConnectSuccess message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof MsgLGS.L2GSConnectSuccess
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {MsgLGS.L2GSConnectSuccess} L2GSConnectSuccess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        L2GSConnectSuccess.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        return L2GSConnectSuccess;
    })();

    MsgLGS.GS2LConnectAuth = (function() {

        /**
         * Properties of a GS2LConnectAuth.
         * @memberof MsgLGS
         * @interface IGS2LConnectAuth
         * @property {string|null} [ip] GS2LConnectAuth ip
         * @property {number|null} [port] GS2LConnectAuth port
         * @property {number|null} [serverId] GS2LConnectAuth serverId
         * @property {string|null} [serverName] GS2LConnectAuth serverName
         * @property {string|null} [token] GS2LConnectAuth token
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
         * GS2LConnectAuth port.
         * @member {number} port
         * @memberof MsgLGS.GS2LConnectAuth
         * @instance
         */
        GS2LConnectAuth.prototype.port = 0;

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
         * GS2LConnectAuth token.
         * @member {string} token
         * @memberof MsgLGS.GS2LConnectAuth
         * @instance
         */
        GS2LConnectAuth.prototype.token = "";

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
            if (message.port != null && message.hasOwnProperty("port"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.port);
            if (message.serverId != null && message.hasOwnProperty("serverId"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.serverId);
            if (message.serverName != null && message.hasOwnProperty("serverName"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.serverName);
            if (message.token != null && message.hasOwnProperty("token"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.token);
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
                    message.port = reader.int32();
                    break;
                case 3:
                    message.serverId = reader.int32();
                    break;
                case 4:
                    message.serverName = reader.string();
                    break;
                case 5:
                    message.token = reader.string();
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
