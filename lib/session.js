import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

const sessionOptions = {
    cookieName: "authuser",
    password: "xVVADEP2qGtKDG77DjUrLT66zLhuRHvaU",
    cookieOptions: {

        maxAge: undefined,
        secure: process.env.NODE_ENV === "production",
    },
};

export function withSessionRoute(handler) {
    return withIronSessionApiRoute(handler, sessionOptions);
}

export function withSessionSsr(handler) {
    return withIronSessionSsr(handler, sessionOptions);
}