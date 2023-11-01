import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { db } from "~/server/db";
import { Prisma } from "@prisma/client";
import { api } from "~/trpc/server";

export const safeUserValidator = Prisma.validator<Prisma.UserDefaultArgs>()({
    select: {
        id: true,
        image: true,
        name: true,
        role: true
    }
})
export const safeCardValidator = Prisma.validator<Prisma.CardDefaultArgs>()({
    select: {
        id: true,
        image: true,
        name: true,
        numericalId: true,
        owner: safeUserValidator
    }
})
export const cardValidator = Prisma.validator<Prisma.CardDefaultArgs>()({
    select: {
        id: true,
        image: true,
        name: true,
        numericalId: true,
        balance: true,
        createTime: true,
        owner: safeUserValidator
    }
})

export type SafeCard = NonNullable<Prisma.Result<typeof db.card, typeof safeCardValidator, "findUnique">>
export type SafeUser = NonNullable<Prisma.Result<typeof db.user, typeof safeUserValidator, "findUnique">>

export const cardRouter = createTRPCRouter({
    selfCount: protectedProcedure.query(async ({ ctx }) => {
        const count = await db.card.count({
            where: {
                ownerId: ctx.session.user.id
            }
        })
        return {
            count
        }
    }),
    byIdSelf: protectedProcedure
        .input(
            z.string()
        ).query(async ({ input, ctx }) => {
            return await db.card.findUnique({
                where: {
                    id: input,
                    ownerId: ctx.session.user.id
                },
                ...cardValidator
            })
        }),
    byId: publicProcedure
        .input(
            z.string()
        ).query(async ({ input }) => {
            return await db.card.findUnique({
                where: {
                    id: input
                },
                ...safeCardValidator
            })
        }),
    byNumber: publicProcedure
        .input(
            z.string().max(8)
        ).query(async ({ input }) => {
            return await db.card.findUnique({
                where: {
                    numericalId: input
                },
                ...safeCardValidator
            })
        }),

    allSelf: protectedProcedure
        .query(async ({ ctx }) => {
            return await db.card.findMany({
                where: { ownerId: ctx.session.user.id },
                ...cardValidator
            })
        })
})