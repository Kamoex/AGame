/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.TestPackage = (function() {

    /**
     * Namespace TestPackage.
     * @exports TestPackage
     * @namespace
     */
    var TestPackage = {};

    TestPackage.TestMessage = (function() {

        /**
         * Properties of a TestMessage.
         * @memberof TestPackage
         * @interface ITestMessage
         * @property {string|null} [sName] TestMessage sName
         * @property {number|Long|null} [nId] TestMessage nId
         * @property {number|null} [fWeight] TestMessage fWeight
         * @property {boolean|null} [bSex] TestMessage bSex
         */

        /**
         * Constructs a new TestMessage.
         * @memberof TestPackage
         * @classdesc Represents a TestMessage.
         * @implements ITestMessage
         * @constructor
         * @param {TestPackage.ITestMessage=} [properties] Properties to set
         */
        function TestMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TestMessage sName.
         * @member {string} sName
         * @memberof TestPackage.TestMessage
         * @instance
         */
        TestMessage.prototype.sName = "";

        /**
         * TestMessage nId.
         * @member {number|Long} nId
         * @memberof TestPackage.TestMessage
         * @instance
         */
        TestMessage.prototype.nId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * TestMessage fWeight.
         * @member {number} fWeight
         * @memberof TestPackage.TestMessage
         * @instance
         */
        TestMessage.prototype.fWeight = 0;

        /**
         * TestMessage bSex.
         * @member {boolean} bSex
         * @memberof TestPackage.TestMessage
         * @instance
         */
        TestMessage.prototype.bSex = false;

        /**
         * Creates a new TestMessage instance using the specified properties.
         * @function create
         * @memberof TestPackage.TestMessage
         * @static
         * @param {TestPackage.ITestMessage=} [properties] Properties to set
         * @returns {TestPackage.TestMessage} TestMessage instance
         */
        TestMessage.create = function create(properties) {
            return new TestMessage(properties);
        };

        /**
         * Encodes the specified TestMessage message. Does not implicitly {@link TestPackage.TestMessage.verify|verify} messages.
         * @function encode
         * @memberof TestPackage.TestMessage
         * @static
         * @param {TestPackage.ITestMessage} message TestMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TestMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.sName != null && message.hasOwnProperty("sName"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.sName);
            if (message.nId != null && message.hasOwnProperty("nId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.nId);
            if (message.fWeight != null && message.hasOwnProperty("fWeight"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.fWeight);
            if (message.bSex != null && message.hasOwnProperty("bSex"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.bSex);
            return writer;
        };

        /**
         * Encodes the specified TestMessage message, length delimited. Does not implicitly {@link TestPackage.TestMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof TestPackage.TestMessage
         * @static
         * @param {TestPackage.ITestMessage} message TestMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TestMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TestMessage message from the specified reader or buffer.
         * @function decode
         * @memberof TestPackage.TestMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {TestPackage.TestMessage} TestMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TestMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.TestPackage.TestMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.sName = reader.string();
                    break;
                case 2:
                    message.nId = reader.int64();
                    break;
                case 3:
                    message.fWeight = reader.float();
                    break;
                case 4:
                    message.bSex = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TestMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof TestPackage.TestMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {TestPackage.TestMessage} TestMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TestMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        return TestMessage;
    })();

    return TestPackage;
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
