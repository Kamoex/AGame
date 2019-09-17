import * as $protobuf from "protobufjs";
/** Namespace MsgBase. */
export namespace MsgBase {
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
        public static encode(message: MsgBase.IMessageHead, writer?: $protobuf.Writer): $protobuf.Writer;
        /**
         * Encodes the specified MessageHead message, length delimited. Does not implicitly {@link MsgBase.MessageHead.verify|verify} messages.
         * @param message MessageHead message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: MsgBase.IMessageHead, writer?: $protobuf.Writer): $protobuf.Writer;
        /**
         * Decodes a MessageHead message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MessageHead
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MsgBase.MessageHead;
        /**
         * Decodes a MessageHead message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MessageHead
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MsgBase.MessageHead;
    }
    /** EServerState enum. */
    enum EServerState {
        ENULL = 0,
        EOPEN = 1,
        EOCLOSE = 2
    }
}
/** Namespace MsgGSC. */
export namespace MsgGSC {
    /** Properties of a C2GSConnect. */
    interface IC2GSConnect {
        /** C2GSConnect ip */
        ip?: (string|null);
        /** C2GSConnect gameVersion */
        gameVersion?: (string|null);
    }
    /** Represents a C2GSConnect. */
    class C2GSConnect implements IC2GSConnect {
        /**
         * Constructs a new C2GSConnect.
         * @param [properties] Properties to set
         */
        constructor(properties?: MsgGSC.IC2GSConnect);
        /** C2GSConnect ip. */
        public ip: string;
        /** C2GSConnect gameVersion. */
        public gameVersion: string;
        /**
         * Creates a new C2GSConnect instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GSConnect instance
         */
        public static create(properties?: MsgGSC.IC2GSConnect): MsgGSC.C2GSConnect;
        /**
         * Encodes the specified C2GSConnect message. Does not implicitly {@link MsgGSC.C2GSConnect.verify|verify} messages.
         * @param message C2GSConnect message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: MsgGSC.IC2GSConnect, writer?: $protobuf.Writer): $protobuf.Writer;
        /**
         * Encodes the specified C2GSConnect message, length delimited. Does not implicitly {@link MsgGSC.C2GSConnect.verify|verify} messages.
         * @param message C2GSConnect message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: MsgGSC.IC2GSConnect, writer?: $protobuf.Writer): $protobuf.Writer;
        /**
         * Decodes a C2GSConnect message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GSConnect
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MsgGSC.C2GSConnect;
        /**
         * Decodes a C2GSConnect message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GSConnect
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MsgGSC.C2GSConnect;
    }
    /** Properties of a GS2CConnect. */
    interface IGS2CConnect {
        /** GS2CConnect success */
        success?: (boolean|null);
    }
    /** Represents a GS2CConnect. */
    class GS2CConnect implements IGS2CConnect {
        /**
         * Constructs a new GS2CConnect.
         * @param [properties] Properties to set
         */
        constructor(properties?: MsgGSC.IGS2CConnect);
        /** GS2CConnect success. */
        public success: boolean;
        /**
         * Creates a new GS2CConnect instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GS2CConnect instance
         */
        public static create(properties?: MsgGSC.IGS2CConnect): MsgGSC.GS2CConnect;
        /**
         * Encodes the specified GS2CConnect message. Does not implicitly {@link MsgGSC.GS2CConnect.verify|verify} messages.
         * @param message GS2CConnect message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: MsgGSC.IGS2CConnect, writer?: $protobuf.Writer): $protobuf.Writer;
        /**
         * Encodes the specified GS2CConnect message, length delimited. Does not implicitly {@link MsgGSC.GS2CConnect.verify|verify} messages.
         * @param message GS2CConnect message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: MsgGSC.IGS2CConnect, writer?: $protobuf.Writer): $protobuf.Writer;
        /**
         * Decodes a GS2CConnect message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GS2CConnect
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MsgGSC.GS2CConnect;
        /**
         * Decodes a GS2CConnect message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GS2CConnect
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MsgGSC.GS2CConnect;
    }
}
/** Namespace MsgLC. */
export namespace MsgLC {
    /** Properties of a ServerInfo. */
    interface IServerInfo {
        /** ServerInfo nID */
        nID?: (number|null);
        /** ServerInfo sName */
        sName?: (string|null);
        /** ServerInfo sIp */
        sIp?: (string|null);
        /** ServerInfo nPort */
        nPort?: (number|null);
        /** ServerInfo eState */
        eState?: (MsgBase.EServerState|null);
    }
    /** Represents a ServerInfo. */
    class ServerInfo implements IServerInfo {
        /**
         * Constructs a new ServerInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: MsgLC.IServerInfo);
        /** ServerInfo nID. */
        public nID: number;
        /** ServerInfo sName. */
        public sName: string;
        /** ServerInfo sIp. */
        public sIp: string;
        /** ServerInfo nPort. */
        public nPort: number;
        /** ServerInfo eState. */
        public eState: MsgBase.EServerState;
        /**
         * Creates a new ServerInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ServerInfo instance
         */
        public static create(properties?: MsgLC.IServerInfo): MsgLC.ServerInfo;
        /**
         * Encodes the specified ServerInfo message. Does not implicitly {@link MsgLC.ServerInfo.verify|verify} messages.
         * @param message ServerInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: MsgLC.IServerInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        /**
         * Encodes the specified ServerInfo message, length delimited. Does not implicitly {@link MsgLC.ServerInfo.verify|verify} messages.
         * @param message ServerInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: MsgLC.IServerInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        /**
         * Decodes a ServerInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ServerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MsgLC.ServerInfo;
        /**
         * Decodes a ServerInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ServerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MsgLC.ServerInfo;
    }
    /** Properties of a L2CServerInfo. */
    interface IL2CServerInfo {
        /** L2CServerInfo serverInfos */
        serverInfos?: (MsgLC.IServerInfo[]|null);
    }
    /** Represents a L2CServerInfo. */
    class L2CServerInfo implements IL2CServerInfo {
        /**
         * Constructs a new L2CServerInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: MsgLC.IL2CServerInfo);
        /** L2CServerInfo serverInfos. */
        public serverInfos: Array<MsgLC.IServerInfo>;
        /**
         * Creates a new L2CServerInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns L2CServerInfo instance
         */
        public static create(properties?: MsgLC.IL2CServerInfo): MsgLC.L2CServerInfo;
        /**
         * Encodes the specified L2CServerInfo message. Does not implicitly {@link MsgLC.L2CServerInfo.verify|verify} messages.
         * @param message L2CServerInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: MsgLC.IL2CServerInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        /**
         * Encodes the specified L2CServerInfo message, length delimited. Does not implicitly {@link MsgLC.L2CServerInfo.verify|verify} messages.
         * @param message L2CServerInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: MsgLC.IL2CServerInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        /**
         * Decodes a L2CServerInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns L2CServerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MsgLC.L2CServerInfo;
        /**
         * Decodes a L2CServerInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns L2CServerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MsgLC.L2CServerInfo;
    }
    /** Properties of a SimRoleInfo. */
    interface ISimRoleInfo {
        /** SimRoleInfo nID */
        nID?: (number|null);
        /** SimRoleInfo sName */
        sName?: (string|null);
    }
    /** Represents a SimRoleInfo. */
    class SimRoleInfo implements ISimRoleInfo {
        /**
         * Constructs a new SimRoleInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: MsgLC.ISimRoleInfo);
        /** SimRoleInfo nID. */
        public nID: number;
        /** SimRoleInfo sName. */
        public sName: string;
        /**
         * Creates a new SimRoleInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SimRoleInfo instance
         */
        public static create(properties?: MsgLC.ISimRoleInfo): MsgLC.SimRoleInfo;
        /**
         * Encodes the specified SimRoleInfo message. Does not implicitly {@link MsgLC.SimRoleInfo.verify|verify} messages.
         * @param message SimRoleInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: MsgLC.ISimRoleInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        /**
         * Encodes the specified SimRoleInfo message, length delimited. Does not implicitly {@link MsgLC.SimRoleInfo.verify|verify} messages.
         * @param message SimRoleInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: MsgLC.ISimRoleInfo, writer?: $protobuf.Writer): $protobuf.Writer;
        /**
         * Decodes a SimRoleInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SimRoleInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MsgLC.SimRoleInfo;
        /**
         * Decodes a SimRoleInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SimRoleInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MsgLC.SimRoleInfo;
    }
    /** Properties of a C2LLogin. */
    interface IC2LLogin {
        /** C2LLogin nChannelID */
        nChannelID?: (number|null);
        /** C2LLogin sToken */
        sToken?: (string|null);
        /** C2LLogin sAccount */
        sAccount?: (string|null);
        /** C2LLogin sPassword */
        sPassword?: (string|null);
        /** C2LLogin sVersion */
        sVersion?: (string|null);
    }
    /** Represents a C2LLogin. */
    class C2LLogin implements IC2LLogin {
        /**
         * Constructs a new C2LLogin.
         * @param [properties] Properties to set
         */
        constructor(properties?: MsgLC.IC2LLogin);
        /** C2LLogin nChannelID. */
        public nChannelID: number;
        /** C2LLogin sToken. */
        public sToken: string;
        /** C2LLogin sAccount. */
        public sAccount: string;
        /** C2LLogin sPassword. */
        public sPassword: string;
        /** C2LLogin sVersion. */
        public sVersion: string;
        /**
         * Creates a new C2LLogin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2LLogin instance
         */
        public static create(properties?: MsgLC.IC2LLogin): MsgLC.C2LLogin;
        /**
         * Encodes the specified C2LLogin message. Does not implicitly {@link MsgLC.C2LLogin.verify|verify} messages.
         * @param message C2LLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: MsgLC.IC2LLogin, writer?: $protobuf.Writer): $protobuf.Writer;
        /**
         * Encodes the specified C2LLogin message, length delimited. Does not implicitly {@link MsgLC.C2LLogin.verify|verify} messages.
         * @param message C2LLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: MsgLC.IC2LLogin, writer?: $protobuf.Writer): $protobuf.Writer;
        /**
         * Decodes a C2LLogin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2LLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MsgLC.C2LLogin;
        /**
         * Decodes a C2LLogin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2LLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MsgLC.C2LLogin;
    }
    /** Properties of a L2CLogin. */
    interface IL2CLogin {
        /** L2CLogin bNeedCreate */
        bNeedCreate?: (boolean|null);
        /** L2CLogin roleInfo */
        roleInfo?: (MsgLC.ISimRoleInfo|null);
    }
    /** Represents a L2CLogin. */
    class L2CLogin implements IL2CLogin {
        /**
         * Constructs a new L2CLogin.
         * @param [properties] Properties to set
         */
        constructor(properties?: MsgLC.IL2CLogin);
        /** L2CLogin bNeedCreate. */
        public bNeedCreate: boolean;
        /** L2CLogin roleInfo. */
        public roleInfo?: (MsgLC.ISimRoleInfo|null);
        /**
         * Creates a new L2CLogin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns L2CLogin instance
         */
        public static create(properties?: MsgLC.IL2CLogin): MsgLC.L2CLogin;
        /**
         * Encodes the specified L2CLogin message. Does not implicitly {@link MsgLC.L2CLogin.verify|verify} messages.
         * @param message L2CLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: MsgLC.IL2CLogin, writer?: $protobuf.Writer): $protobuf.Writer;
        /**
         * Encodes the specified L2CLogin message, length delimited. Does not implicitly {@link MsgLC.L2CLogin.verify|verify} messages.
         * @param message L2CLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: MsgLC.IL2CLogin, writer?: $protobuf.Writer): $protobuf.Writer;
        /**
         * Decodes a L2CLogin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns L2CLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MsgLC.L2CLogin;
        /**
         * Decodes a L2CLogin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns L2CLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MsgLC.L2CLogin;
    }
}
/** Namespace MsgLGS. */
export namespace MsgLGS {
    /** Properties of a L2GSConnectSuccess. */
    interface IL2GSConnectSuccess {
    }
    /** Represents a L2GSConnectSuccess. */
    class L2GSConnectSuccess implements IL2GSConnectSuccess {
        /**
         * Constructs a new L2GSConnectSuccess.
         * @param [properties] Properties to set
         */
        constructor(properties?: MsgLGS.IL2GSConnectSuccess);
        /**
         * Creates a new L2GSConnectSuccess instance using the specified properties.
         * @param [properties] Properties to set
         * @returns L2GSConnectSuccess instance
         */
        public static create(properties?: MsgLGS.IL2GSConnectSuccess): MsgLGS.L2GSConnectSuccess;
        /**
         * Encodes the specified L2GSConnectSuccess message. Does not implicitly {@link MsgLGS.L2GSConnectSuccess.verify|verify} messages.
         * @param message L2GSConnectSuccess message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: MsgLGS.IL2GSConnectSuccess, writer?: $protobuf.Writer): $protobuf.Writer;
        /**
         * Encodes the specified L2GSConnectSuccess message, length delimited. Does not implicitly {@link MsgLGS.L2GSConnectSuccess.verify|verify} messages.
         * @param message L2GSConnectSuccess message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: MsgLGS.IL2GSConnectSuccess, writer?: $protobuf.Writer): $protobuf.Writer;
        /**
         * Decodes a L2GSConnectSuccess message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns L2GSConnectSuccess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MsgLGS.L2GSConnectSuccess;
        /**
         * Decodes a L2GSConnectSuccess message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns L2GSConnectSuccess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MsgLGS.L2GSConnectSuccess;
    }
    /** Properties of a GS2LConnectAuth. */
    interface IGS2LConnectAuth {
        /** GS2LConnectAuth ip */
        ip?: (string|null);
        /** GS2LConnectAuth port */
        port?: (number|null);
        /** GS2LConnectAuth serverId */
        serverId?: (number|null);
        /** GS2LConnectAuth serverName */
        serverName?: (string|null);
        /** GS2LConnectAuth token */
        token?: (string|null);
    }
    /** Represents a GS2LConnectAuth. */
    class GS2LConnectAuth implements IGS2LConnectAuth {
        /**
         * Constructs a new GS2LConnectAuth.
         * @param [properties] Properties to set
         */
        constructor(properties?: MsgLGS.IGS2LConnectAuth);
        /** GS2LConnectAuth ip. */
        public ip: string;
        /** GS2LConnectAuth port. */
        public port: number;
        /** GS2LConnectAuth serverId. */
        public serverId: number;
        /** GS2LConnectAuth serverName. */
        public serverName: string;
        /** GS2LConnectAuth token. */
        public token: string;
        /**
         * Creates a new GS2LConnectAuth instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GS2LConnectAuth instance
         */
        public static create(properties?: MsgLGS.IGS2LConnectAuth): MsgLGS.GS2LConnectAuth;
        /**
         * Encodes the specified GS2LConnectAuth message. Does not implicitly {@link MsgLGS.GS2LConnectAuth.verify|verify} messages.
         * @param message GS2LConnectAuth message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: MsgLGS.IGS2LConnectAuth, writer?: $protobuf.Writer): $protobuf.Writer;
        /**
         * Encodes the specified GS2LConnectAuth message, length delimited. Does not implicitly {@link MsgLGS.GS2LConnectAuth.verify|verify} messages.
         * @param message GS2LConnectAuth message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: MsgLGS.IGS2LConnectAuth, writer?: $protobuf.Writer): $protobuf.Writer;
        /**
         * Decodes a GS2LConnectAuth message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GS2LConnectAuth
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MsgLGS.GS2LConnectAuth;
        /**
         * Decodes a GS2LConnectAuth message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GS2LConnectAuth
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MsgLGS.GS2LConnectAuth;
    }
    /** Properties of a L2GSConnectAuth. */
    interface IL2GSConnectAuth {
        /** L2GSConnectAuth success */
        success?: (boolean|null);
    }
    /** Represents a L2GSConnectAuth. */
    class L2GSConnectAuth implements IL2GSConnectAuth {
        /**
         * Constructs a new L2GSConnectAuth.
         * @param [properties] Properties to set
         */
        constructor(properties?: MsgLGS.IL2GSConnectAuth);
        /** L2GSConnectAuth success. */
        public success: boolean;
        /**
         * Creates a new L2GSConnectAuth instance using the specified properties.
         * @param [properties] Properties to set
         * @returns L2GSConnectAuth instance
         */
        public static create(properties?: MsgLGS.IL2GSConnectAuth): MsgLGS.L2GSConnectAuth;
        /**
         * Encodes the specified L2GSConnectAuth message. Does not implicitly {@link MsgLGS.L2GSConnectAuth.verify|verify} messages.
         * @param message L2GSConnectAuth message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: MsgLGS.IL2GSConnectAuth, writer?: $protobuf.Writer): $protobuf.Writer;
        /**
         * Encodes the specified L2GSConnectAuth message, length delimited. Does not implicitly {@link MsgLGS.L2GSConnectAuth.verify|verify} messages.
         * @param message L2GSConnectAuth message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: MsgLGS.IL2GSConnectAuth, writer?: $protobuf.Writer): $protobuf.Writer;
        /**
         * Decodes a L2GSConnectAuth message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns L2GSConnectAuth
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MsgLGS.L2GSConnectAuth;
        /**
         * Decodes a L2GSConnectAuth message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns L2GSConnectAuth
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MsgLGS.L2GSConnectAuth;
    }
}
/** Namespace TestPackage2. */
export namespace TestPackage2 {
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
        public static encode(message: TestPackage2.IPeople, writer?: $protobuf.Writer): $protobuf.Writer;
        /**
         * Encodes the specified People message, length delimited. Does not implicitly {@link TestPackage2.People.verify|verify} messages.
         * @param message People message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: TestPackage2.IPeople, writer?: $protobuf.Writer): $protobuf.Writer;
        /**
         * Decodes a People message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns People
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): TestPackage2.People;
        /**
         * Decodes a People message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns People
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): TestPackage2.People;
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
        public static encode(message: TestPackage2.IParent, writer?: $protobuf.Writer): $protobuf.Writer;
        /**
         * Encodes the specified Parent message, length delimited. Does not implicitly {@link TestPackage2.Parent.verify|verify} messages.
         * @param message Parent message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: TestPackage2.IParent, writer?: $protobuf.Writer): $protobuf.Writer;
        /**
         * Decodes a Parent message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Parent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): TestPackage2.Parent;
        /**
         * Decodes a Parent message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Parent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): TestPackage2.Parent;
    }
}
