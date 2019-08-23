var $protobuf = window.protobuf;
$protobuf.roots.default=window;
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

$root.MsgCS = (function() {

    /**
     * Namespace MsgCS.
     * @exports MsgCS
     * @namespace
     */
    var MsgCS = {};

    MsgCS.C2LLogin = (function() {

        /**
         * Properties of a C2LLogin.
         * @memberof MsgCS
         * @interface IC2LLogin
         * @property {string|null} [sAccount] C2LLogin sAccount
         * @property {string|null} [sPassword] C2LLogin sPassword
         */

        /**
         * Constructs a new C2LLogin.
         * @memberof MsgCS
         * @classdesc Represents a C2LLogin.
         * @implements IC2LLogin
         * @constructor
         * @param {MsgCS.IC2LLogin=} [properties] Properties to set
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
         * @memberof MsgCS.C2LLogin
         * @instance
         */
        C2LLogin.prototype.sAccount = "";

        /**
         * C2LLogin sPassword.
         * @member {string} sPassword
         * @memberof MsgCS.C2LLogin
         * @instance
         */
        C2LLogin.prototype.sPassword = "";

        /**
         * Creates a new C2LLogin instance using the specified properties.
         * @function create
         * @memberof MsgCS.C2LLogin
         * @static
         * @param {MsgCS.IC2LLogin=} [properties] Properties to set
         * @returns {MsgCS.C2LLogin} C2LLogin instance
         */
        C2LLogin.create = function create(properties) {
            return new C2LLogin(properties);
        };

        /**
         * Encodes the specified C2LLogin message. Does not implicitly {@link MsgCS.C2LLogin.verify|verify} messages.
         * @function encode
         * @memberof MsgCS.C2LLogin
         * @static
         * @param {MsgCS.IC2LLogin} message C2LLogin message or plain object to encode
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
         * Encodes the specified C2LLogin message, length delimited. Does not implicitly {@link MsgCS.C2LLogin.verify|verify} messages.
         * @function encodeDelimited
         * @memberof MsgCS.C2LLogin
         * @static
         * @param {MsgCS.IC2LLogin} message C2LLogin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2LLogin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2LLogin message from the specified reader or buffer.
         * @function decode
         * @memberof MsgCS.C2LLogin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {MsgCS.C2LLogin} C2LLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2LLogin.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MsgCS.C2LLogin();
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
         * @memberof MsgCS.C2LLogin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {MsgCS.C2LLogin} C2LLogin
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

    MsgCS.L2CLogin = (function() {

        /**
         * Properties of a L2CLogin.
         * @memberof MsgCS
         * @interface IL2CLogin
         * @property {boolean|null} [bNeedCreate] L2CLogin bNeedCreate
         */

        /**
         * Constructs a new L2CLogin.
         * @memberof MsgCS
         * @classdesc Represents a L2CLogin.
         * @implements IL2CLogin
         * @constructor
         * @param {MsgCS.IL2CLogin=} [properties] Properties to set
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
         * @memberof MsgCS.L2CLogin
         * @instance
         */
        L2CLogin.prototype.bNeedCreate = false;

        /**
         * Creates a new L2CLogin instance using the specified properties.
         * @function create
         * @memberof MsgCS.L2CLogin
         * @static
         * @param {MsgCS.IL2CLogin=} [properties] Properties to set
         * @returns {MsgCS.L2CLogin} L2CLogin instance
         */
        L2CLogin.create = function create(properties) {
            return new L2CLogin(properties);
        };

        /**
         * Encodes the specified L2CLogin message. Does not implicitly {@link MsgCS.L2CLogin.verify|verify} messages.
         * @function encode
         * @memberof MsgCS.L2CLogin
         * @static
         * @param {MsgCS.IL2CLogin} message L2CLogin message or plain object to encode
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
         * Encodes the specified L2CLogin message, length delimited. Does not implicitly {@link MsgCS.L2CLogin.verify|verify} messages.
         * @function encodeDelimited
         * @memberof MsgCS.L2CLogin
         * @static
         * @param {MsgCS.IL2CLogin} message L2CLogin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        L2CLogin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a L2CLogin message from the specified reader or buffer.
         * @function decode
         * @memberof MsgCS.L2CLogin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {MsgCS.L2CLogin} L2CLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        L2CLogin.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MsgCS.L2CLogin();
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
         * @memberof MsgCS.L2CLogin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {MsgCS.L2CLogin} L2CLogin
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

    return MsgCS;
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