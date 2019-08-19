type Long = protobuf.Long;
// DO NOT EDIT! This is a generated file. Edit the JSDoc in src/*.js instead and run 'npm run types'.

/** Namespace TestPackage. */
export declare namespace TestPackage {

    /** Properties of a TestMessage. */
    interface ITestMessage {

        /** TestMessage sName */
        sName?: (string|null);

        /** TestMessage nId */
        nId?: (number|Long|null);

        /** TestMessage fWeight */
        fWeight?: (number|null);

        /** TestMessage bSex */
        bSex?: (boolean|null);
    }

    /** Represents a TestMessage. */
    class TestMessage implements ITestMessage {

        /**
         * Constructs a new TestMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: TestPackage.ITestMessage);

        /** TestMessage sName. */
        public sName: string;

        /** TestMessage nId. */
        public nId: (number|Long);

        /** TestMessage fWeight. */
        public fWeight: number;

        /** TestMessage bSex. */
        public bSex: boolean;

        /**
         * Creates a new TestMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TestMessage instance
         */
        public static create(properties?: TestPackage.ITestMessage): TestPackage.TestMessage;

        /**
         * Encodes the specified TestMessage message. Does not implicitly {@link TestPackage.TestMessage.verify|verify} messages.
         * @param message TestMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: TestPackage.ITestMessage, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TestMessage message, length delimited. Does not implicitly {@link TestPackage.TestMessage.verify|verify} messages.
         * @param message TestMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: TestPackage.ITestMessage, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TestMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TestMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): TestPackage.TestMessage;

        /**
         * Decodes a TestMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TestMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): TestPackage.TestMessage;
    }
}

/** Namespace TestPackage2. */
export declare namespace TestPackage2 {

    /** Properties of a People. */
    interface IPeople {

        /** People sName */
        sName?: (string|null);

        /** People nAge */
        nAge?: (number|null);

        /** People PeopleType */
        PeopleType?: (TestPackage2.People.eTypes|null);
    }

    /** Represents a People. */
    class People implements IPeople {

        /**
         * Constructs a new People.
         * @param [properties] Properties to set
         */
        constructor(properties?: TestPackage2.IPeople);

        /** People sName. */
        public sName: string;

        /** People nAge. */
        public nAge: number;

        /** People PeopleType. */
        public PeopleType: TestPackage2.People.eTypes;

        /**
         * Creates a new People instance using the specified properties.
         * @param [properties] Properties to set
         * @returns People instance
         */
        public static create(properties?: TestPackage2.IPeople): TestPackage2.People;

        /**
         * Encodes the specified People message. Does not implicitly {@link TestPackage2.People.verify|verify} messages.
         * @param message People message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: TestPackage2.IPeople, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified People message, length delimited. Does not implicitly {@link TestPackage2.People.verify|verify} messages.
         * @param message People message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: TestPackage2.IPeople, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a People message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns People
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): TestPackage2.People;

        /**
         * Decodes a People message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns People
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): TestPackage2.People;
    }

    namespace People {

        /** eTypes enum. */
        enum eTypes {
            e_NULL = 0,
            e_Mom = 1,
            e_Dad = 2,
            e_End = 3
        }
    }

    /** Properties of a Parent. */
    interface IParent {

        /** Parent person */
        person?: (TestPackage2.IPeople|null);

        /** Parent sComment */
        sComment?: (string|null);
    }

    /** Represents a Parent. */
    class Parent implements IParent {

        /**
         * Constructs a new Parent.
         * @param [properties] Properties to set
         */
        constructor(properties?: TestPackage2.IParent);

        /** Parent person. */
        public person?: (TestPackage2.IPeople|null);

        /** Parent sComment. */
        public sComment: string;

        /**
         * Creates a new Parent instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Parent instance
         */
        public static create(properties?: TestPackage2.IParent): TestPackage2.Parent;

        /**
         * Encodes the specified Parent message. Does not implicitly {@link TestPackage2.Parent.verify|verify} messages.
         * @param message Parent message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: TestPackage2.IParent, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified Parent message, length delimited. Does not implicitly {@link TestPackage2.Parent.verify|verify} messages.
         * @param message Parent message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: TestPackage2.IParent, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a Parent message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Parent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): TestPackage2.Parent;

        /**
         * Decodes a Parent message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Parent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): TestPackage2.Parent;
    }
}
