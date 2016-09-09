interface Owner {
    username: string;
    realname: string;
}

export class GetInfoResponse {
    owner: Owner;
    farm: number;
    server: number;
    secret: string;
    id: number;
    url: string;

    // constructor(args: any) {
    //     this.owner = args.owner;
    //     this.farm = args.farm;
    //     this.server = args.server;
    //     this.secret = args.secret;
    //     this.id = args.id;
    // }
}