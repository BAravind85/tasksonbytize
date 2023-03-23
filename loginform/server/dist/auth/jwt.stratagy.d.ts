declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(playload: any): Promise<{
        email: any;
        userid: any;
    }>;
}
export {};
