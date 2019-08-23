type Long = protobuf.Long;
// DO NOT EDIT! This is a generated file. Edit the JSDoc in src/*.js instead and run 'npm run types'.

/** Namespace MsgBase. */
declare namespace MsgBase {

    /** Properties of a MessageHead. */
    interface IMessageHead {

        /** MessageHead nMsgID */
        nMsgID?: (number|null);

        /** MessageHead nMsgLength */
        nMsgLength?: (number|null);

        /** MessageHead data */
        data?: (Uint8Array|null);
    }

    /** Represents a MessageHead. */
    class MessageHead implements IMessageHead {

        /**
         * Constructs a new MessageHead.
         * @param [properties] Properties to set
         */
        constructor(properties?: MsgBase.IMessageHead);

        /** MessageHead nMsgID. */
        public nMsgID: number;

        /** MessageHead nMsgLength. */
        public nMsgLength: number;

        /** MessageHead data. */
        public data: Uint8Array;

        /**
         * Creates a new MessageHead instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MessageHead instance
         */
        public static create(properties?: MsgBase.IMessageHead): MsgBase.MessageHead;

        /**
         * Encodes the specified MessageHead message. Does not implicitly {@link MsgBase.MessageHead.verify|verify} messages.
         * @param message MessageHead message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: MsgBase.IMessageHead, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified MessageHead message, length delimited. Does not implicitly {@link MsgBase.MessageHead.verify|verify} messages.
         * @param message MessageHead message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: MsgBase.IMessageHead, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a MessageHead message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MessageHead
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): MsgBase.MessageHead;

        /**
         * Decodes a MessageHead message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MessageHead
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): MsgBase.MessageHead;
    }
}

/** Namespace MsgCS. */
declare namespace MsgCS {

    /** Properties of a C2LLogin. */
    interface IC2LLogin {

        /** C2LLogin sAccount */
        sAccount?: (string|null);

        /** C2LLogin sPassword */
        sPassword?: (string|null);
    }

    /** Represents a C2LLogin. */
    class C2LLogin implements IC2LLogin {

        /**
         * Constructs a new C2LLogin.
         * @param [properties] Properties to set
         */
        constructor(properties?: MsgCS.IC2LLogin);

        /** C2LLogin sAccount. */
        public sAccount: string;

        /** C2LLogin sPassword. */
        public sPassword: string;

        /**
         * Creates a new C2LLogin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2LLogin instance
         */
        public static create(properties?: MsgCS.IC2LLogin): MsgCS.C2LLogin;

        /**
         * Encodes the specified C2LLogin message. Does not implicitly {@link MsgCS.C2LLogin.verify|verify} messages.
         * @param message C2LLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: MsgCS.IC2LLogin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2LLogin message, length delimited. Does not implicitly {@link MsgCS.C2LLogin.verify|verify} messages.
         * @param message C2LLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: MsgCS.IC2LLogin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2LLogin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2LLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): MsgCS.C2LLogin;

        /**
         * Decodes a C2LLogin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2LLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): MsgCS.C2LLogin;
    }

    /** Properties of a L2CLogin. */
    interface IL2CLogin {

        /** L2CLogin bNeedCreate */
        bNeedCreate?: (boolean|null);
    }

    /** Represents a L2CLogin. */
    class L2CLogin implements IL2CLogin {

        /**
         * Constructs a new L2CLogin.
         * @param [properties] Properties to set
         */
        constructor(properties?: MsgCS.IL2CLogin);

        /** L2CLogin bNeedCreate. */
        public bNeedCreate: boolean;

        /**
         * Creates a new L2CLogin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns L2CLogin instance
         */
        public static create(properties?: MsgCS.IL2CLogin): MsgCS.L2CLogin;

        /**
         * Encodes the specified L2CLogin message. Does not implicitly {@link MsgCS.L2CLogin.verify|verify} messages.
         * @param message L2CLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: MsgCS.IL2CLogin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified L2CLogin message, length delimited. Does not implicitly {@link MsgCS.L2CLogin.verify|verify} messages.
         * @param message L2CLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: MsgCS.IL2CLogin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a L2CLogin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns L2CLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): MsgCS.L2CLogin;

        /**
         * Decodes a L2CLogin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns L2CLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): MsgCS.L2CLogin;
    }
}

/** Namespace TestPackage2. */
declare namespace TestPackage2 {

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
