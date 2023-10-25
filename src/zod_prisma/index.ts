import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const AccountScalarFieldEnumSchema = z.enum(['id','userId','type','provider','providerAccountId','refresh_token','access_token','expires_at','token_type','scope','id_token','session_state']);

export const SessionScalarFieldEnumSchema = z.enum(['id','sessionToken','userId','expires']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','emailVerified','image','role']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['identifier','token','expires']);

export const CardScalarFieldEnumSchema = z.enum(['id','ownerId','createTime','numericalId','image','name','balance']);

export const TransactionScalarFieldEnumSchema = z.enum(['id','type','summ','reason','date','comment','fromCardId','toCardId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const RoleSchema = z.enum(['MEMBER','OPERATOR','ADMIN']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

export const TransactionTypeSchema = z.enum(['TRANSFER','SYSTEM']);

export type TransactionTypeType = `${z.infer<typeof TransactionTypeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullish(),
  access_token: z.string().nullish(),
  expires_at: z.number().int().nullish(),
  token_type: z.string().nullish(),
  scope: z.string().nullish(),
  id_token: z.string().nullish(),
  session_state: z.string().nullish(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string().cuid(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  role: RoleSchema,
  id: z.string().cuid(),
  name: z.string().nullish(),
  email: z.string().nullish(),
  emailVerified: z.coerce.date().nullish(),
  image: z.string().nullish(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
})

export type VerificationToken = z.infer<typeof VerificationTokenSchema>

/////////////////////////////////////////
// CARD SCHEMA
/////////////////////////////////////////

export const CardSchema = z.object({
  id: z.string().cuid(),
  ownerId: z.string(),
  createTime: z.coerce.date(),
  numericalId: z.string(),
  image: z.string().nullish(),
  name: z.string(),
  balance: z.number().int(),
})

export type Card = z.infer<typeof CardSchema>

/////////////////////////////////////////
// TRANSACTION SCHEMA
/////////////////////////////////////////

export const TransactionSchema = z.object({
  type: TransactionTypeSchema,
  id: z.string().cuid(),
  summ: z.number().int(),
  reason: z.string(),
  date: z.coerce.date(),
  comment: z.string().nullish(),
  fromCardId: z.string(),
  toCardId: z.string().nullish(),
})

export type Transaction = z.infer<typeof TransactionSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const AccountArgsSchema: z.ZodType<Prisma.AccountDefaultArgs> = z.object({
  select: z.lazy(() => AccountSelectSchema).optional(),
  include: z.lazy(() => AccountIncludeSchema).optional(),
}).strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  type: z.boolean().optional(),
  provider: z.boolean().optional(),
  providerAccountId: z.boolean().optional(),
  refresh_token: z.boolean().optional(),
  access_token: z.boolean().optional(),
  expires_at: z.boolean().optional(),
  token_type: z.boolean().optional(),
  scope: z.boolean().optional(),
  id_token: z.boolean().optional(),
  session_state: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  id: z.boolean().optional(),
  sessionToken: z.boolean().optional(),
  userId: z.boolean().optional(),
  expires: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  cards: z.union([z.boolean(),z.lazy(() => CardFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  accounts: z.boolean().optional(),
  sessions: z.boolean().optional(),
  cards: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  image: z.boolean().optional(),
  role: z.boolean().optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  cards: z.union([z.boolean(),z.lazy(() => CardFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenSelectSchema: z.ZodType<Prisma.VerificationTokenSelect> = z.object({
  identifier: z.boolean().optional(),
  token: z.boolean().optional(),
  expires: z.boolean().optional(),
}).strict()

// CARD
//------------------------------------------------------

export const CardIncludeSchema: z.ZodType<Prisma.CardInclude> = z.object({
  owner: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  transactionFrom: z.union([z.boolean(),z.lazy(() => TransactionFindManyArgsSchema)]).optional(),
  transactionTo: z.union([z.boolean(),z.lazy(() => TransactionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CardCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CardArgsSchema: z.ZodType<Prisma.CardDefaultArgs> = z.object({
  select: z.lazy(() => CardSelectSchema).optional(),
  include: z.lazy(() => CardIncludeSchema).optional(),
}).strict();

export const CardCountOutputTypeArgsSchema: z.ZodType<Prisma.CardCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CardCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CardCountOutputTypeSelectSchema: z.ZodType<Prisma.CardCountOutputTypeSelect> = z.object({
  transactionFrom: z.boolean().optional(),
  transactionTo: z.boolean().optional(),
}).strict();

export const CardSelectSchema: z.ZodType<Prisma.CardSelect> = z.object({
  id: z.boolean().optional(),
  ownerId: z.boolean().optional(),
  createTime: z.boolean().optional(),
  numericalId: z.boolean().optional(),
  image: z.boolean().optional(),
  name: z.boolean().optional(),
  balance: z.boolean().optional(),
  owner: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  transactionFrom: z.union([z.boolean(),z.lazy(() => TransactionFindManyArgsSchema)]).optional(),
  transactionTo: z.union([z.boolean(),z.lazy(() => TransactionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CardCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TRANSACTION
//------------------------------------------------------

export const TransactionIncludeSchema: z.ZodType<Prisma.TransactionInclude> = z.object({
  fromCard: z.union([z.boolean(),z.lazy(() => CardArgsSchema)]).optional(),
  toCard: z.union([z.boolean(),z.lazy(() => CardArgsSchema)]).optional(),
}).strict()

export const TransactionArgsSchema: z.ZodType<Prisma.TransactionDefaultArgs> = z.object({
  select: z.lazy(() => TransactionSelectSchema).optional(),
  include: z.lazy(() => TransactionIncludeSchema).optional(),
}).strict();

export const TransactionSelectSchema: z.ZodType<Prisma.TransactionSelect> = z.object({
  id: z.boolean().optional(),
  type: z.boolean().optional(),
  summ: z.boolean().optional(),
  reason: z.boolean().optional(),
  date: z.boolean().optional(),
  comment: z.boolean().optional(),
  fromCardId: z.boolean().optional(),
  toCardId: z.boolean().optional(),
  fromCard: z.union([z.boolean(),z.lazy(() => CardArgsSchema)]).optional(),
  toCard: z.union([z.boolean(),z.lazy(() => CardArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AccountAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AccountSumOrderByAggregateInputSchema).optional()
}).strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    sessionToken: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    sessionToken: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string().optional(),
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional()
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  cards: z.lazy(() => CardListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  cards: z.lazy(() => CardOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    email: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  cards: z.lazy(() => CardListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  role: z.union([ z.lazy(() => EnumRoleWithAggregatesFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
}).strict();

export const VerificationTokenWhereInputSchema: z.ZodType<Prisma.VerificationTokenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VerificationTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithRelationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenWhereUniqueInputSchema: z.ZodType<Prisma.VerificationTokenWhereUniqueInput> = z.union([
  z.object({
    token: z.string(),
    identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema)
  }),
  z.object({
    token: z.string(),
  }),
  z.object({
    identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  token: z.string().optional(),
  identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const VerificationTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithAggregationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VerificationTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VerificationTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VerificationTokenMinOrderByAggregateInputSchema).optional()
}).strict();

export const VerificationTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationTokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CardWhereInputSchema: z.ZodType<Prisma.CardWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CardWhereInputSchema),z.lazy(() => CardWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CardWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CardWhereInputSchema),z.lazy(() => CardWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ownerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  numericalId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  balance: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  owner: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  transactionFrom: z.lazy(() => TransactionListRelationFilterSchema).optional(),
  transactionTo: z.lazy(() => TransactionListRelationFilterSchema).optional()
}).strict();

export const CardOrderByWithRelationInputSchema: z.ZodType<Prisma.CardOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  createTime: z.lazy(() => SortOrderSchema).optional(),
  numericalId: z.lazy(() => SortOrderSchema).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  balance: z.lazy(() => SortOrderSchema).optional(),
  owner: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  transactionFrom: z.lazy(() => TransactionOrderByRelationAggregateInputSchema).optional(),
  transactionTo: z.lazy(() => TransactionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CardWhereUniqueInputSchema: z.ZodType<Prisma.CardWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    numericalId: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    numericalId: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  numericalId: z.string().optional(),
  AND: z.union([ z.lazy(() => CardWhereInputSchema),z.lazy(() => CardWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CardWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CardWhereInputSchema),z.lazy(() => CardWhereInputSchema).array() ]).optional(),
  ownerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  balance: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  owner: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  transactionFrom: z.lazy(() => TransactionListRelationFilterSchema).optional(),
  transactionTo: z.lazy(() => TransactionListRelationFilterSchema).optional()
}).strict());

export const CardOrderByWithAggregationInputSchema: z.ZodType<Prisma.CardOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  createTime: z.lazy(() => SortOrderSchema).optional(),
  numericalId: z.lazy(() => SortOrderSchema).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  balance: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CardCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CardAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CardMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CardMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CardSumOrderByAggregateInputSchema).optional()
}).strict();

export const CardScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CardScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CardScalarWhereWithAggregatesInputSchema),z.lazy(() => CardScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CardScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CardScalarWhereWithAggregatesInputSchema),z.lazy(() => CardScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  ownerId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createTime: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  numericalId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  balance: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const TransactionWhereInputSchema: z.ZodType<Prisma.TransactionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TransactionWhereInputSchema),z.lazy(() => TransactionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TransactionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TransactionWhereInputSchema),z.lazy(() => TransactionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumTransactionTypeFilterSchema),z.lazy(() => TransactionTypeSchema) ]).optional(),
  summ: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  reason: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  comment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  fromCardId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  toCardId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  fromCard: z.union([ z.lazy(() => CardRelationFilterSchema),z.lazy(() => CardWhereInputSchema) ]).optional(),
  toCard: z.union([ z.lazy(() => CardNullableRelationFilterSchema),z.lazy(() => CardWhereInputSchema) ]).optional().nullable(),
}).strict();

export const TransactionOrderByWithRelationInputSchema: z.ZodType<Prisma.TransactionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  summ: z.lazy(() => SortOrderSchema).optional(),
  reason: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  comment: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  fromCardId: z.lazy(() => SortOrderSchema).optional(),
  toCardId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  fromCard: z.lazy(() => CardOrderByWithRelationInputSchema).optional(),
  toCard: z.lazy(() => CardOrderByWithRelationInputSchema).optional()
}).strict();

export const TransactionWhereUniqueInputSchema: z.ZodType<Prisma.TransactionWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => TransactionWhereInputSchema),z.lazy(() => TransactionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TransactionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TransactionWhereInputSchema),z.lazy(() => TransactionWhereInputSchema).array() ]).optional(),
  type: z.union([ z.lazy(() => EnumTransactionTypeFilterSchema),z.lazy(() => TransactionTypeSchema) ]).optional(),
  summ: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  reason: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  comment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  fromCardId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  toCardId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  fromCard: z.union([ z.lazy(() => CardRelationFilterSchema),z.lazy(() => CardWhereInputSchema) ]).optional(),
  toCard: z.union([ z.lazy(() => CardNullableRelationFilterSchema),z.lazy(() => CardWhereInputSchema) ]).optional().nullable(),
}).strict());

export const TransactionOrderByWithAggregationInputSchema: z.ZodType<Prisma.TransactionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  summ: z.lazy(() => SortOrderSchema).optional(),
  reason: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  comment: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  fromCardId: z.lazy(() => SortOrderSchema).optional(),
  toCardId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => TransactionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TransactionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TransactionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TransactionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TransactionSumOrderByAggregateInputSchema).optional()
}).strict();

export const TransactionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TransactionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TransactionScalarWhereWithAggregatesInputSchema),z.lazy(() => TransactionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TransactionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TransactionScalarWhereWithAggregatesInputSchema),z.lazy(() => TransactionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumTransactionTypeWithAggregatesFilterSchema),z.lazy(() => TransactionTypeSchema) ]).optional(),
  summ: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  reason: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  comment: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  fromCardId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  toCardId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema)
}).strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema).optional()
}).strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema)
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  cards: z.lazy(() => CardCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  cards: z.lazy(() => CardUncheckedCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  cards: z.lazy(() => CardUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  cards: z.lazy(() => CardUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenCreateInputSchema: z.ZodType<Prisma.VerificationTokenCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenCreateManyInputSchema: z.ZodType<Prisma.VerificationTokenCreateManyInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationTokenUpdateManyMutationInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CardCreateInputSchema: z.ZodType<Prisma.CardCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createTime: z.coerce.date().optional(),
  numericalId: z.string(),
  image: z.string().optional().nullable(),
  name: z.string(),
  balance: z.number().int().optional(),
  owner: z.lazy(() => UserCreateNestedOneWithoutCardsInputSchema),
  transactionFrom: z.lazy(() => TransactionCreateNestedManyWithoutFromCardInputSchema).optional(),
  transactionTo: z.lazy(() => TransactionCreateNestedManyWithoutToCardInputSchema).optional()
}).strict();

export const CardUncheckedCreateInputSchema: z.ZodType<Prisma.CardUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  ownerId: z.string(),
  createTime: z.coerce.date().optional(),
  numericalId: z.string(),
  image: z.string().optional().nullable(),
  name: z.string(),
  balance: z.number().int().optional(),
  transactionFrom: z.lazy(() => TransactionUncheckedCreateNestedManyWithoutFromCardInputSchema).optional(),
  transactionTo: z.lazy(() => TransactionUncheckedCreateNestedManyWithoutToCardInputSchema).optional()
}).strict();

export const CardUpdateInputSchema: z.ZodType<Prisma.CardUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  numericalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutCardsNestedInputSchema).optional(),
  transactionFrom: z.lazy(() => TransactionUpdateManyWithoutFromCardNestedInputSchema).optional(),
  transactionTo: z.lazy(() => TransactionUpdateManyWithoutToCardNestedInputSchema).optional()
}).strict();

export const CardUncheckedUpdateInputSchema: z.ZodType<Prisma.CardUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  numericalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transactionFrom: z.lazy(() => TransactionUncheckedUpdateManyWithoutFromCardNestedInputSchema).optional(),
  transactionTo: z.lazy(() => TransactionUncheckedUpdateManyWithoutToCardNestedInputSchema).optional()
}).strict();

export const CardCreateManyInputSchema: z.ZodType<Prisma.CardCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  ownerId: z.string(),
  createTime: z.coerce.date().optional(),
  numericalId: z.string(),
  image: z.string().optional().nullable(),
  name: z.string(),
  balance: z.number().int().optional()
}).strict();

export const CardUpdateManyMutationInputSchema: z.ZodType<Prisma.CardUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  numericalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CardUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CardUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  numericalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TransactionCreateInputSchema: z.ZodType<Prisma.TransactionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.lazy(() => TransactionTypeSchema),
  summ: z.number().int(),
  reason: z.string(),
  date: z.coerce.date().optional(),
  comment: z.string().optional().nullable(),
  fromCard: z.lazy(() => CardCreateNestedOneWithoutTransactionFromInputSchema),
  toCard: z.lazy(() => CardCreateNestedOneWithoutTransactionToInputSchema).optional()
}).strict();

export const TransactionUncheckedCreateInputSchema: z.ZodType<Prisma.TransactionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.lazy(() => TransactionTypeSchema),
  summ: z.number().int(),
  reason: z.string(),
  date: z.coerce.date().optional(),
  comment: z.string().optional().nullable(),
  fromCardId: z.string(),
  toCardId: z.string().optional().nullable()
}).strict();

export const TransactionUpdateInputSchema: z.ZodType<Prisma.TransactionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionTypeSchema),z.lazy(() => EnumTransactionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  summ: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reason: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fromCard: z.lazy(() => CardUpdateOneRequiredWithoutTransactionFromNestedInputSchema).optional(),
  toCard: z.lazy(() => CardUpdateOneWithoutTransactionToNestedInputSchema).optional()
}).strict();

export const TransactionUncheckedUpdateInputSchema: z.ZodType<Prisma.TransactionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionTypeSchema),z.lazy(() => EnumTransactionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  summ: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reason: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fromCardId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  toCardId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TransactionCreateManyInputSchema: z.ZodType<Prisma.TransactionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.lazy(() => TransactionTypeSchema),
  summ: z.number().int(),
  reason: z.string(),
  date: z.coerce.date().optional(),
  comment: z.string().optional().nullable(),
  fromCardId: z.string(),
  toCardId: z.string().optional().nullable()
}).strict();

export const TransactionUpdateManyMutationInputSchema: z.ZodType<Prisma.TransactionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionTypeSchema),z.lazy(() => EnumTransactionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  summ: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reason: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TransactionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TransactionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionTypeSchema),z.lazy(() => EnumTransactionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  summ: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reason: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fromCardId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  toCardId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const AccountProviderProviderAccountIdCompoundUniqueInputSchema: z.ZodType<Prisma.AccountProviderProviderAccountIdCompoundUniqueInput> = z.object({
  provider: z.string(),
  providerAccountId: z.string()
}).strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const EnumRoleFilterSchema: z.ZodType<Prisma.EnumRoleFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
}).strict();

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> = z.object({
  every: z.lazy(() => AccountWhereInputSchema).optional(),
  some: z.lazy(() => AccountWhereInputSchema).optional(),
  none: z.lazy(() => AccountWhereInputSchema).optional()
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const CardListRelationFilterSchema: z.ZodType<Prisma.CardListRelationFilter> = z.object({
  every: z.lazy(() => CardWhereInputSchema).optional(),
  some: z.lazy(() => CardWhereInputSchema).optional(),
  none: z.lazy(() => CardWhereInputSchema).optional()
}).strict();

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CardOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CardOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const EnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict();

export const VerificationTokenIdentifierTokenCompoundUniqueInputSchema: z.ZodType<Prisma.VerificationTokenIdentifierTokenCompoundUniqueInput> = z.object({
  identifier: z.string(),
  token: z.string()
}).strict();

export const VerificationTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenCountOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMaxOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMinOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const TransactionListRelationFilterSchema: z.ZodType<Prisma.TransactionListRelationFilter> = z.object({
  every: z.lazy(() => TransactionWhereInputSchema).optional(),
  some: z.lazy(() => TransactionWhereInputSchema).optional(),
  none: z.lazy(() => TransactionWhereInputSchema).optional()
}).strict();

export const TransactionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TransactionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CardCountOrderByAggregateInputSchema: z.ZodType<Prisma.CardCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  createTime: z.lazy(() => SortOrderSchema).optional(),
  numericalId: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  balance: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CardAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CardAvgOrderByAggregateInput> = z.object({
  balance: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CardMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CardMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  createTime: z.lazy(() => SortOrderSchema).optional(),
  numericalId: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  balance: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CardMinOrderByAggregateInputSchema: z.ZodType<Prisma.CardMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  createTime: z.lazy(() => SortOrderSchema).optional(),
  numericalId: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  balance: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CardSumOrderByAggregateInputSchema: z.ZodType<Prisma.CardSumOrderByAggregateInput> = z.object({
  balance: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const EnumTransactionTypeFilterSchema: z.ZodType<Prisma.EnumTransactionTypeFilter> = z.object({
  equals: z.lazy(() => TransactionTypeSchema).optional(),
  in: z.lazy(() => TransactionTypeSchema).array().optional(),
  notIn: z.lazy(() => TransactionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TransactionTypeSchema),z.lazy(() => NestedEnumTransactionTypeFilterSchema) ]).optional(),
}).strict();

export const CardRelationFilterSchema: z.ZodType<Prisma.CardRelationFilter> = z.object({
  is: z.lazy(() => CardWhereInputSchema).optional(),
  isNot: z.lazy(() => CardWhereInputSchema).optional()
}).strict();

export const CardNullableRelationFilterSchema: z.ZodType<Prisma.CardNullableRelationFilter> = z.object({
  is: z.lazy(() => CardWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => CardWhereInputSchema).optional().nullable()
}).strict();

export const TransactionCountOrderByAggregateInputSchema: z.ZodType<Prisma.TransactionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  summ: z.lazy(() => SortOrderSchema).optional(),
  reason: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  fromCardId: z.lazy(() => SortOrderSchema).optional(),
  toCardId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TransactionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TransactionAvgOrderByAggregateInput> = z.object({
  summ: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TransactionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TransactionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  summ: z.lazy(() => SortOrderSchema).optional(),
  reason: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  fromCardId: z.lazy(() => SortOrderSchema).optional(),
  toCardId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TransactionMinOrderByAggregateInputSchema: z.ZodType<Prisma.TransactionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  summ: z.lazy(() => SortOrderSchema).optional(),
  reason: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  fromCardId: z.lazy(() => SortOrderSchema).optional(),
  toCardId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TransactionSumOrderByAggregateInputSchema: z.ZodType<Prisma.TransactionSumOrderByAggregateInput> = z.object({
  summ: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumTransactionTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumTransactionTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TransactionTypeSchema).optional(),
  in: z.lazy(() => TransactionTypeSchema).array().optional(),
  notIn: z.lazy(() => TransactionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TransactionTypeSchema),z.lazy(() => NestedEnumTransactionTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTransactionTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTransactionTypeFilterSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAccountsInputSchema),z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputSchema),z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]).optional(),
}).strict();

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CardCreateNestedManyWithoutOwnerInputSchema: z.ZodType<Prisma.CardCreateNestedManyWithoutOwnerInput> = z.object({
  create: z.union([ z.lazy(() => CardCreateWithoutOwnerInputSchema),z.lazy(() => CardCreateWithoutOwnerInputSchema).array(),z.lazy(() => CardUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => CardUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CardCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => CardCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CardCreateManyOwnerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CardWhereUniqueInputSchema),z.lazy(() => CardWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CardUncheckedCreateNestedManyWithoutOwnerInputSchema: z.ZodType<Prisma.CardUncheckedCreateNestedManyWithoutOwnerInput> = z.object({
  create: z.union([ z.lazy(() => CardCreateWithoutOwnerInputSchema),z.lazy(() => CardCreateWithoutOwnerInputSchema).array(),z.lazy(() => CardUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => CardUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CardCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => CardCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CardCreateManyOwnerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CardWhereUniqueInputSchema),z.lazy(() => CardWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const EnumRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRoleFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => RoleSchema).optional()
}).strict();

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CardUpdateManyWithoutOwnerNestedInputSchema: z.ZodType<Prisma.CardUpdateManyWithoutOwnerNestedInput> = z.object({
  create: z.union([ z.lazy(() => CardCreateWithoutOwnerInputSchema),z.lazy(() => CardCreateWithoutOwnerInputSchema).array(),z.lazy(() => CardUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => CardUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CardCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => CardCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CardUpsertWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => CardUpsertWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CardCreateManyOwnerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CardWhereUniqueInputSchema),z.lazy(() => CardWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CardWhereUniqueInputSchema),z.lazy(() => CardWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CardWhereUniqueInputSchema),z.lazy(() => CardWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CardWhereUniqueInputSchema),z.lazy(() => CardWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CardUpdateWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => CardUpdateWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CardUpdateManyWithWhereWithoutOwnerInputSchema),z.lazy(() => CardUpdateManyWithWhereWithoutOwnerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CardScalarWhereInputSchema),z.lazy(() => CardScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CardUncheckedUpdateManyWithoutOwnerNestedInputSchema: z.ZodType<Prisma.CardUncheckedUpdateManyWithoutOwnerNestedInput> = z.object({
  create: z.union([ z.lazy(() => CardCreateWithoutOwnerInputSchema),z.lazy(() => CardCreateWithoutOwnerInputSchema).array(),z.lazy(() => CardUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => CardUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CardCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => CardCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CardUpsertWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => CardUpsertWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CardCreateManyOwnerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CardWhereUniqueInputSchema),z.lazy(() => CardWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CardWhereUniqueInputSchema),z.lazy(() => CardWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CardWhereUniqueInputSchema),z.lazy(() => CardWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CardWhereUniqueInputSchema),z.lazy(() => CardWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CardUpdateWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => CardUpdateWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CardUpdateManyWithWhereWithoutOwnerInputSchema),z.lazy(() => CardUpdateManyWithWhereWithoutOwnerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CardScalarWhereInputSchema),z.lazy(() => CardScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutCardsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCardsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCardsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCardsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCardsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const TransactionCreateNestedManyWithoutFromCardInputSchema: z.ZodType<Prisma.TransactionCreateNestedManyWithoutFromCardInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutFromCardInputSchema),z.lazy(() => TransactionCreateWithoutFromCardInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutFromCardInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutFromCardInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutFromCardInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutFromCardInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyFromCardInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TransactionCreateNestedManyWithoutToCardInputSchema: z.ZodType<Prisma.TransactionCreateNestedManyWithoutToCardInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutToCardInputSchema),z.lazy(() => TransactionCreateWithoutToCardInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutToCardInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutToCardInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutToCardInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutToCardInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyToCardInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TransactionUncheckedCreateNestedManyWithoutFromCardInputSchema: z.ZodType<Prisma.TransactionUncheckedCreateNestedManyWithoutFromCardInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutFromCardInputSchema),z.lazy(() => TransactionCreateWithoutFromCardInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutFromCardInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutFromCardInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutFromCardInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutFromCardInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyFromCardInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TransactionUncheckedCreateNestedManyWithoutToCardInputSchema: z.ZodType<Prisma.TransactionUncheckedCreateNestedManyWithoutToCardInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutToCardInputSchema),z.lazy(() => TransactionCreateWithoutToCardInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutToCardInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutToCardInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutToCardInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutToCardInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyToCardInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateOneRequiredWithoutCardsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCardsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCardsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCardsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCardsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCardsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutCardsInputSchema),z.lazy(() => UserUpdateWithoutCardsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCardsInputSchema) ]).optional(),
}).strict();

export const TransactionUpdateManyWithoutFromCardNestedInputSchema: z.ZodType<Prisma.TransactionUpdateManyWithoutFromCardNestedInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutFromCardInputSchema),z.lazy(() => TransactionCreateWithoutFromCardInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutFromCardInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutFromCardInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutFromCardInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutFromCardInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TransactionUpsertWithWhereUniqueWithoutFromCardInputSchema),z.lazy(() => TransactionUpsertWithWhereUniqueWithoutFromCardInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyFromCardInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TransactionUpdateWithWhereUniqueWithoutFromCardInputSchema),z.lazy(() => TransactionUpdateWithWhereUniqueWithoutFromCardInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TransactionUpdateManyWithWhereWithoutFromCardInputSchema),z.lazy(() => TransactionUpdateManyWithWhereWithoutFromCardInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TransactionScalarWhereInputSchema),z.lazy(() => TransactionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TransactionUpdateManyWithoutToCardNestedInputSchema: z.ZodType<Prisma.TransactionUpdateManyWithoutToCardNestedInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutToCardInputSchema),z.lazy(() => TransactionCreateWithoutToCardInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutToCardInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutToCardInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutToCardInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutToCardInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TransactionUpsertWithWhereUniqueWithoutToCardInputSchema),z.lazy(() => TransactionUpsertWithWhereUniqueWithoutToCardInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyToCardInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TransactionUpdateWithWhereUniqueWithoutToCardInputSchema),z.lazy(() => TransactionUpdateWithWhereUniqueWithoutToCardInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TransactionUpdateManyWithWhereWithoutToCardInputSchema),z.lazy(() => TransactionUpdateManyWithWhereWithoutToCardInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TransactionScalarWhereInputSchema),z.lazy(() => TransactionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TransactionUncheckedUpdateManyWithoutFromCardNestedInputSchema: z.ZodType<Prisma.TransactionUncheckedUpdateManyWithoutFromCardNestedInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutFromCardInputSchema),z.lazy(() => TransactionCreateWithoutFromCardInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutFromCardInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutFromCardInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutFromCardInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutFromCardInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TransactionUpsertWithWhereUniqueWithoutFromCardInputSchema),z.lazy(() => TransactionUpsertWithWhereUniqueWithoutFromCardInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyFromCardInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TransactionUpdateWithWhereUniqueWithoutFromCardInputSchema),z.lazy(() => TransactionUpdateWithWhereUniqueWithoutFromCardInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TransactionUpdateManyWithWhereWithoutFromCardInputSchema),z.lazy(() => TransactionUpdateManyWithWhereWithoutFromCardInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TransactionScalarWhereInputSchema),z.lazy(() => TransactionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TransactionUncheckedUpdateManyWithoutToCardNestedInputSchema: z.ZodType<Prisma.TransactionUncheckedUpdateManyWithoutToCardNestedInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutToCardInputSchema),z.lazy(() => TransactionCreateWithoutToCardInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutToCardInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutToCardInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutToCardInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutToCardInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TransactionUpsertWithWhereUniqueWithoutToCardInputSchema),z.lazy(() => TransactionUpsertWithWhereUniqueWithoutToCardInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyToCardInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TransactionUpdateWithWhereUniqueWithoutToCardInputSchema),z.lazy(() => TransactionUpdateWithWhereUniqueWithoutToCardInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TransactionUpdateManyWithWhereWithoutToCardInputSchema),z.lazy(() => TransactionUpdateManyWithWhereWithoutToCardInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TransactionScalarWhereInputSchema),z.lazy(() => TransactionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CardCreateNestedOneWithoutTransactionFromInputSchema: z.ZodType<Prisma.CardCreateNestedOneWithoutTransactionFromInput> = z.object({
  create: z.union([ z.lazy(() => CardCreateWithoutTransactionFromInputSchema),z.lazy(() => CardUncheckedCreateWithoutTransactionFromInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CardCreateOrConnectWithoutTransactionFromInputSchema).optional(),
  connect: z.lazy(() => CardWhereUniqueInputSchema).optional()
}).strict();

export const CardCreateNestedOneWithoutTransactionToInputSchema: z.ZodType<Prisma.CardCreateNestedOneWithoutTransactionToInput> = z.object({
  create: z.union([ z.lazy(() => CardCreateWithoutTransactionToInputSchema),z.lazy(() => CardUncheckedCreateWithoutTransactionToInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CardCreateOrConnectWithoutTransactionToInputSchema).optional(),
  connect: z.lazy(() => CardWhereUniqueInputSchema).optional()
}).strict();

export const EnumTransactionTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumTransactionTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => TransactionTypeSchema).optional()
}).strict();

export const CardUpdateOneRequiredWithoutTransactionFromNestedInputSchema: z.ZodType<Prisma.CardUpdateOneRequiredWithoutTransactionFromNestedInput> = z.object({
  create: z.union([ z.lazy(() => CardCreateWithoutTransactionFromInputSchema),z.lazy(() => CardUncheckedCreateWithoutTransactionFromInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CardCreateOrConnectWithoutTransactionFromInputSchema).optional(),
  upsert: z.lazy(() => CardUpsertWithoutTransactionFromInputSchema).optional(),
  connect: z.lazy(() => CardWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CardUpdateToOneWithWhereWithoutTransactionFromInputSchema),z.lazy(() => CardUpdateWithoutTransactionFromInputSchema),z.lazy(() => CardUncheckedUpdateWithoutTransactionFromInputSchema) ]).optional(),
}).strict();

export const CardUpdateOneWithoutTransactionToNestedInputSchema: z.ZodType<Prisma.CardUpdateOneWithoutTransactionToNestedInput> = z.object({
  create: z.union([ z.lazy(() => CardCreateWithoutTransactionToInputSchema),z.lazy(() => CardUncheckedCreateWithoutTransactionToInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CardCreateOrConnectWithoutTransactionToInputSchema).optional(),
  upsert: z.lazy(() => CardUpsertWithoutTransactionToInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => CardWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => CardWhereInputSchema) ]).optional(),
  connect: z.lazy(() => CardWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CardUpdateToOneWithWhereWithoutTransactionToInputSchema),z.lazy(() => CardUpdateWithoutTransactionToInputSchema),z.lazy(() => CardUncheckedUpdateWithoutTransactionToInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumRoleFilterSchema: z.ZodType<Prisma.NestedEnumRoleFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedEnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedEnumTransactionTypeFilterSchema: z.ZodType<Prisma.NestedEnumTransactionTypeFilter> = z.object({
  equals: z.lazy(() => TransactionTypeSchema).optional(),
  in: z.lazy(() => TransactionTypeSchema).array().optional(),
  notIn: z.lazy(() => TransactionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TransactionTypeSchema),z.lazy(() => NestedEnumTransactionTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumTransactionTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumTransactionTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TransactionTypeSchema).optional(),
  in: z.lazy(() => TransactionTypeSchema).array().optional(),
  notIn: z.lazy(() => TransactionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TransactionTypeSchema),z.lazy(() => NestedEnumTransactionTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTransactionTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTransactionTypeFilterSchema).optional()
}).strict();

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  cards: z.lazy(() => CardCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  cards: z.lazy(() => CardUncheckedCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  cards: z.lazy(() => CardUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  cards: z.lazy(() => CardUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  cards: z.lazy(() => CardCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  cards: z.lazy(() => CardUncheckedCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  cards: z.lazy(() => CardUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  cards: z.lazy(() => CardUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict();

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AccountCreateManyUserInputSchema),z.lazy(() => AccountCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyUserInputSchema),z.lazy(() => SessionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CardCreateWithoutOwnerInputSchema: z.ZodType<Prisma.CardCreateWithoutOwnerInput> = z.object({
  id: z.string().cuid().optional(),
  createTime: z.coerce.date().optional(),
  numericalId: z.string(),
  image: z.string().optional().nullable(),
  name: z.string(),
  balance: z.number().int().optional(),
  transactionFrom: z.lazy(() => TransactionCreateNestedManyWithoutFromCardInputSchema).optional(),
  transactionTo: z.lazy(() => TransactionCreateNestedManyWithoutToCardInputSchema).optional()
}).strict();

export const CardUncheckedCreateWithoutOwnerInputSchema: z.ZodType<Prisma.CardUncheckedCreateWithoutOwnerInput> = z.object({
  id: z.string().cuid().optional(),
  createTime: z.coerce.date().optional(),
  numericalId: z.string(),
  image: z.string().optional().nullable(),
  name: z.string(),
  balance: z.number().int().optional(),
  transactionFrom: z.lazy(() => TransactionUncheckedCreateNestedManyWithoutFromCardInputSchema).optional(),
  transactionTo: z.lazy(() => TransactionUncheckedCreateNestedManyWithoutToCardInputSchema).optional()
}).strict();

export const CardCreateOrConnectWithoutOwnerInputSchema: z.ZodType<Prisma.CardCreateOrConnectWithoutOwnerInput> = z.object({
  where: z.lazy(() => CardWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CardCreateWithoutOwnerInputSchema),z.lazy(() => CardUncheckedCreateWithoutOwnerInputSchema) ]),
}).strict();

export const CardCreateManyOwnerInputEnvelopeSchema: z.ZodType<Prisma.CardCreateManyOwnerInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CardCreateManyOwnerInputSchema),z.lazy(() => CardCreateManyOwnerInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AccountScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateManyMutationInputSchema),z.lazy(() => AccountUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CardUpsertWithWhereUniqueWithoutOwnerInputSchema: z.ZodType<Prisma.CardUpsertWithWhereUniqueWithoutOwnerInput> = z.object({
  where: z.lazy(() => CardWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CardUpdateWithoutOwnerInputSchema),z.lazy(() => CardUncheckedUpdateWithoutOwnerInputSchema) ]),
  create: z.union([ z.lazy(() => CardCreateWithoutOwnerInputSchema),z.lazy(() => CardUncheckedCreateWithoutOwnerInputSchema) ]),
}).strict();

export const CardUpdateWithWhereUniqueWithoutOwnerInputSchema: z.ZodType<Prisma.CardUpdateWithWhereUniqueWithoutOwnerInput> = z.object({
  where: z.lazy(() => CardWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CardUpdateWithoutOwnerInputSchema),z.lazy(() => CardUncheckedUpdateWithoutOwnerInputSchema) ]),
}).strict();

export const CardUpdateManyWithWhereWithoutOwnerInputSchema: z.ZodType<Prisma.CardUpdateManyWithWhereWithoutOwnerInput> = z.object({
  where: z.lazy(() => CardScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CardUpdateManyMutationInputSchema),z.lazy(() => CardUncheckedUpdateManyWithoutOwnerInputSchema) ]),
}).strict();

export const CardScalarWhereInputSchema: z.ZodType<Prisma.CardScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CardScalarWhereInputSchema),z.lazy(() => CardScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CardScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CardScalarWhereInputSchema),z.lazy(() => CardScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ownerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  numericalId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  balance: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const UserCreateWithoutCardsInputSchema: z.ZodType<Prisma.UserCreateWithoutCardsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutCardsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCardsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutCardsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCardsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCardsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCardsInputSchema) ]),
}).strict();

export const TransactionCreateWithoutFromCardInputSchema: z.ZodType<Prisma.TransactionCreateWithoutFromCardInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.lazy(() => TransactionTypeSchema),
  summ: z.number().int(),
  reason: z.string(),
  date: z.coerce.date().optional(),
  comment: z.string().optional().nullable(),
  toCard: z.lazy(() => CardCreateNestedOneWithoutTransactionToInputSchema).optional()
}).strict();

export const TransactionUncheckedCreateWithoutFromCardInputSchema: z.ZodType<Prisma.TransactionUncheckedCreateWithoutFromCardInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.lazy(() => TransactionTypeSchema),
  summ: z.number().int(),
  reason: z.string(),
  date: z.coerce.date().optional(),
  comment: z.string().optional().nullable(),
  toCardId: z.string().optional().nullable()
}).strict();

export const TransactionCreateOrConnectWithoutFromCardInputSchema: z.ZodType<Prisma.TransactionCreateOrConnectWithoutFromCardInput> = z.object({
  where: z.lazy(() => TransactionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TransactionCreateWithoutFromCardInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutFromCardInputSchema) ]),
}).strict();

export const TransactionCreateManyFromCardInputEnvelopeSchema: z.ZodType<Prisma.TransactionCreateManyFromCardInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TransactionCreateManyFromCardInputSchema),z.lazy(() => TransactionCreateManyFromCardInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TransactionCreateWithoutToCardInputSchema: z.ZodType<Prisma.TransactionCreateWithoutToCardInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.lazy(() => TransactionTypeSchema),
  summ: z.number().int(),
  reason: z.string(),
  date: z.coerce.date().optional(),
  comment: z.string().optional().nullable(),
  fromCard: z.lazy(() => CardCreateNestedOneWithoutTransactionFromInputSchema)
}).strict();

export const TransactionUncheckedCreateWithoutToCardInputSchema: z.ZodType<Prisma.TransactionUncheckedCreateWithoutToCardInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.lazy(() => TransactionTypeSchema),
  summ: z.number().int(),
  reason: z.string(),
  date: z.coerce.date().optional(),
  comment: z.string().optional().nullable(),
  fromCardId: z.string()
}).strict();

export const TransactionCreateOrConnectWithoutToCardInputSchema: z.ZodType<Prisma.TransactionCreateOrConnectWithoutToCardInput> = z.object({
  where: z.lazy(() => TransactionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TransactionCreateWithoutToCardInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutToCardInputSchema) ]),
}).strict();

export const TransactionCreateManyToCardInputEnvelopeSchema: z.ZodType<Prisma.TransactionCreateManyToCardInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TransactionCreateManyToCardInputSchema),z.lazy(() => TransactionCreateManyToCardInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutCardsInputSchema: z.ZodType<Prisma.UserUpsertWithoutCardsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutCardsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCardsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCardsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCardsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutCardsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCardsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutCardsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCardsInputSchema) ]),
}).strict();

export const UserUpdateWithoutCardsInputSchema: z.ZodType<Prisma.UserUpdateWithoutCardsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutCardsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCardsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const TransactionUpsertWithWhereUniqueWithoutFromCardInputSchema: z.ZodType<Prisma.TransactionUpsertWithWhereUniqueWithoutFromCardInput> = z.object({
  where: z.lazy(() => TransactionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TransactionUpdateWithoutFromCardInputSchema),z.lazy(() => TransactionUncheckedUpdateWithoutFromCardInputSchema) ]),
  create: z.union([ z.lazy(() => TransactionCreateWithoutFromCardInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutFromCardInputSchema) ]),
}).strict();

export const TransactionUpdateWithWhereUniqueWithoutFromCardInputSchema: z.ZodType<Prisma.TransactionUpdateWithWhereUniqueWithoutFromCardInput> = z.object({
  where: z.lazy(() => TransactionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TransactionUpdateWithoutFromCardInputSchema),z.lazy(() => TransactionUncheckedUpdateWithoutFromCardInputSchema) ]),
}).strict();

export const TransactionUpdateManyWithWhereWithoutFromCardInputSchema: z.ZodType<Prisma.TransactionUpdateManyWithWhereWithoutFromCardInput> = z.object({
  where: z.lazy(() => TransactionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TransactionUpdateManyMutationInputSchema),z.lazy(() => TransactionUncheckedUpdateManyWithoutFromCardInputSchema) ]),
}).strict();

export const TransactionScalarWhereInputSchema: z.ZodType<Prisma.TransactionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TransactionScalarWhereInputSchema),z.lazy(() => TransactionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TransactionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TransactionScalarWhereInputSchema),z.lazy(() => TransactionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumTransactionTypeFilterSchema),z.lazy(() => TransactionTypeSchema) ]).optional(),
  summ: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  reason: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  comment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  fromCardId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  toCardId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const TransactionUpsertWithWhereUniqueWithoutToCardInputSchema: z.ZodType<Prisma.TransactionUpsertWithWhereUniqueWithoutToCardInput> = z.object({
  where: z.lazy(() => TransactionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TransactionUpdateWithoutToCardInputSchema),z.lazy(() => TransactionUncheckedUpdateWithoutToCardInputSchema) ]),
  create: z.union([ z.lazy(() => TransactionCreateWithoutToCardInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutToCardInputSchema) ]),
}).strict();

export const TransactionUpdateWithWhereUniqueWithoutToCardInputSchema: z.ZodType<Prisma.TransactionUpdateWithWhereUniqueWithoutToCardInput> = z.object({
  where: z.lazy(() => TransactionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TransactionUpdateWithoutToCardInputSchema),z.lazy(() => TransactionUncheckedUpdateWithoutToCardInputSchema) ]),
}).strict();

export const TransactionUpdateManyWithWhereWithoutToCardInputSchema: z.ZodType<Prisma.TransactionUpdateManyWithWhereWithoutToCardInput> = z.object({
  where: z.lazy(() => TransactionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TransactionUpdateManyMutationInputSchema),z.lazy(() => TransactionUncheckedUpdateManyWithoutToCardInputSchema) ]),
}).strict();

export const CardCreateWithoutTransactionFromInputSchema: z.ZodType<Prisma.CardCreateWithoutTransactionFromInput> = z.object({
  id: z.string().cuid().optional(),
  createTime: z.coerce.date().optional(),
  numericalId: z.string(),
  image: z.string().optional().nullable(),
  name: z.string(),
  balance: z.number().int().optional(),
  owner: z.lazy(() => UserCreateNestedOneWithoutCardsInputSchema),
  transactionTo: z.lazy(() => TransactionCreateNestedManyWithoutToCardInputSchema).optional()
}).strict();

export const CardUncheckedCreateWithoutTransactionFromInputSchema: z.ZodType<Prisma.CardUncheckedCreateWithoutTransactionFromInput> = z.object({
  id: z.string().cuid().optional(),
  ownerId: z.string(),
  createTime: z.coerce.date().optional(),
  numericalId: z.string(),
  image: z.string().optional().nullable(),
  name: z.string(),
  balance: z.number().int().optional(),
  transactionTo: z.lazy(() => TransactionUncheckedCreateNestedManyWithoutToCardInputSchema).optional()
}).strict();

export const CardCreateOrConnectWithoutTransactionFromInputSchema: z.ZodType<Prisma.CardCreateOrConnectWithoutTransactionFromInput> = z.object({
  where: z.lazy(() => CardWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CardCreateWithoutTransactionFromInputSchema),z.lazy(() => CardUncheckedCreateWithoutTransactionFromInputSchema) ]),
}).strict();

export const CardCreateWithoutTransactionToInputSchema: z.ZodType<Prisma.CardCreateWithoutTransactionToInput> = z.object({
  id: z.string().cuid().optional(),
  createTime: z.coerce.date().optional(),
  numericalId: z.string(),
  image: z.string().optional().nullable(),
  name: z.string(),
  balance: z.number().int().optional(),
  owner: z.lazy(() => UserCreateNestedOneWithoutCardsInputSchema),
  transactionFrom: z.lazy(() => TransactionCreateNestedManyWithoutFromCardInputSchema).optional()
}).strict();

export const CardUncheckedCreateWithoutTransactionToInputSchema: z.ZodType<Prisma.CardUncheckedCreateWithoutTransactionToInput> = z.object({
  id: z.string().cuid().optional(),
  ownerId: z.string(),
  createTime: z.coerce.date().optional(),
  numericalId: z.string(),
  image: z.string().optional().nullable(),
  name: z.string(),
  balance: z.number().int().optional(),
  transactionFrom: z.lazy(() => TransactionUncheckedCreateNestedManyWithoutFromCardInputSchema).optional()
}).strict();

export const CardCreateOrConnectWithoutTransactionToInputSchema: z.ZodType<Prisma.CardCreateOrConnectWithoutTransactionToInput> = z.object({
  where: z.lazy(() => CardWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CardCreateWithoutTransactionToInputSchema),z.lazy(() => CardUncheckedCreateWithoutTransactionToInputSchema) ]),
}).strict();

export const CardUpsertWithoutTransactionFromInputSchema: z.ZodType<Prisma.CardUpsertWithoutTransactionFromInput> = z.object({
  update: z.union([ z.lazy(() => CardUpdateWithoutTransactionFromInputSchema),z.lazy(() => CardUncheckedUpdateWithoutTransactionFromInputSchema) ]),
  create: z.union([ z.lazy(() => CardCreateWithoutTransactionFromInputSchema),z.lazy(() => CardUncheckedCreateWithoutTransactionFromInputSchema) ]),
  where: z.lazy(() => CardWhereInputSchema).optional()
}).strict();

export const CardUpdateToOneWithWhereWithoutTransactionFromInputSchema: z.ZodType<Prisma.CardUpdateToOneWithWhereWithoutTransactionFromInput> = z.object({
  where: z.lazy(() => CardWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CardUpdateWithoutTransactionFromInputSchema),z.lazy(() => CardUncheckedUpdateWithoutTransactionFromInputSchema) ]),
}).strict();

export const CardUpdateWithoutTransactionFromInputSchema: z.ZodType<Prisma.CardUpdateWithoutTransactionFromInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  numericalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutCardsNestedInputSchema).optional(),
  transactionTo: z.lazy(() => TransactionUpdateManyWithoutToCardNestedInputSchema).optional()
}).strict();

export const CardUncheckedUpdateWithoutTransactionFromInputSchema: z.ZodType<Prisma.CardUncheckedUpdateWithoutTransactionFromInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  numericalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transactionTo: z.lazy(() => TransactionUncheckedUpdateManyWithoutToCardNestedInputSchema).optional()
}).strict();

export const CardUpsertWithoutTransactionToInputSchema: z.ZodType<Prisma.CardUpsertWithoutTransactionToInput> = z.object({
  update: z.union([ z.lazy(() => CardUpdateWithoutTransactionToInputSchema),z.lazy(() => CardUncheckedUpdateWithoutTransactionToInputSchema) ]),
  create: z.union([ z.lazy(() => CardCreateWithoutTransactionToInputSchema),z.lazy(() => CardUncheckedCreateWithoutTransactionToInputSchema) ]),
  where: z.lazy(() => CardWhereInputSchema).optional()
}).strict();

export const CardUpdateToOneWithWhereWithoutTransactionToInputSchema: z.ZodType<Prisma.CardUpdateToOneWithWhereWithoutTransactionToInput> = z.object({
  where: z.lazy(() => CardWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CardUpdateWithoutTransactionToInputSchema),z.lazy(() => CardUncheckedUpdateWithoutTransactionToInputSchema) ]),
}).strict();

export const CardUpdateWithoutTransactionToInputSchema: z.ZodType<Prisma.CardUpdateWithoutTransactionToInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  numericalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutCardsNestedInputSchema).optional(),
  transactionFrom: z.lazy(() => TransactionUpdateManyWithoutFromCardNestedInputSchema).optional()
}).strict();

export const CardUncheckedUpdateWithoutTransactionToInputSchema: z.ZodType<Prisma.CardUncheckedUpdateWithoutTransactionToInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  numericalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transactionFrom: z.lazy(() => TransactionUncheckedUpdateManyWithoutFromCardNestedInputSchema).optional()
}).strict();

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const CardCreateManyOwnerInputSchema: z.ZodType<Prisma.CardCreateManyOwnerInput> = z.object({
  id: z.string().cuid().optional(),
  createTime: z.coerce.date().optional(),
  numericalId: z.string(),
  image: z.string().optional().nullable(),
  name: z.string(),
  balance: z.number().int().optional()
}).strict();

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CardUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.CardUpdateWithoutOwnerInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  numericalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transactionFrom: z.lazy(() => TransactionUpdateManyWithoutFromCardNestedInputSchema).optional(),
  transactionTo: z.lazy(() => TransactionUpdateManyWithoutToCardNestedInputSchema).optional()
}).strict();

export const CardUncheckedUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.CardUncheckedUpdateWithoutOwnerInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  numericalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transactionFrom: z.lazy(() => TransactionUncheckedUpdateManyWithoutFromCardNestedInputSchema).optional(),
  transactionTo: z.lazy(() => TransactionUncheckedUpdateManyWithoutToCardNestedInputSchema).optional()
}).strict();

export const CardUncheckedUpdateManyWithoutOwnerInputSchema: z.ZodType<Prisma.CardUncheckedUpdateManyWithoutOwnerInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  numericalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TransactionCreateManyFromCardInputSchema: z.ZodType<Prisma.TransactionCreateManyFromCardInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.lazy(() => TransactionTypeSchema),
  summ: z.number().int(),
  reason: z.string(),
  date: z.coerce.date().optional(),
  comment: z.string().optional().nullable(),
  toCardId: z.string().optional().nullable()
}).strict();

export const TransactionCreateManyToCardInputSchema: z.ZodType<Prisma.TransactionCreateManyToCardInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.lazy(() => TransactionTypeSchema),
  summ: z.number().int(),
  reason: z.string(),
  date: z.coerce.date().optional(),
  comment: z.string().optional().nullable(),
  fromCardId: z.string()
}).strict();

export const TransactionUpdateWithoutFromCardInputSchema: z.ZodType<Prisma.TransactionUpdateWithoutFromCardInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionTypeSchema),z.lazy(() => EnumTransactionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  summ: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reason: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  toCard: z.lazy(() => CardUpdateOneWithoutTransactionToNestedInputSchema).optional()
}).strict();

export const TransactionUncheckedUpdateWithoutFromCardInputSchema: z.ZodType<Prisma.TransactionUncheckedUpdateWithoutFromCardInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionTypeSchema),z.lazy(() => EnumTransactionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  summ: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reason: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  toCardId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TransactionUncheckedUpdateManyWithoutFromCardInputSchema: z.ZodType<Prisma.TransactionUncheckedUpdateManyWithoutFromCardInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionTypeSchema),z.lazy(() => EnumTransactionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  summ: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reason: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  toCardId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TransactionUpdateWithoutToCardInputSchema: z.ZodType<Prisma.TransactionUpdateWithoutToCardInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionTypeSchema),z.lazy(() => EnumTransactionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  summ: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reason: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fromCard: z.lazy(() => CardUpdateOneRequiredWithoutTransactionFromNestedInputSchema).optional()
}).strict();

export const TransactionUncheckedUpdateWithoutToCardInputSchema: z.ZodType<Prisma.TransactionUncheckedUpdateWithoutToCardInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionTypeSchema),z.lazy(() => EnumTransactionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  summ: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reason: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fromCardId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TransactionUncheckedUpdateManyWithoutToCardInputSchema: z.ZodType<Prisma.TransactionUncheckedUpdateManyWithoutToCardInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionTypeSchema),z.lazy(() => EnumTransactionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  summ: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reason: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fromCardId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithAggregationInputSchema.array(),AccountOrderByWithAggregationInputSchema ]).optional(),
  by: AccountScalarFieldEnumSchema.array(),
  having: AccountScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict()

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict()

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const VerificationTokenFindFirstArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const VerificationTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const VerificationTokenFindManyArgsSchema: z.ZodType<Prisma.VerificationTokenFindManyArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const VerificationTokenAggregateArgsSchema: z.ZodType<Prisma.VerificationTokenAggregateArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const VerificationTokenGroupByArgsSchema: z.ZodType<Prisma.VerificationTokenGroupByArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithAggregationInputSchema.array(),VerificationTokenOrderByWithAggregationInputSchema ]).optional(),
  by: VerificationTokenScalarFieldEnumSchema.array(),
  having: VerificationTokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const VerificationTokenFindUniqueArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const VerificationTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const CardFindFirstArgsSchema: z.ZodType<Prisma.CardFindFirstArgs> = z.object({
  select: CardSelectSchema.optional(),
  include: CardIncludeSchema.optional(),
  where: CardWhereInputSchema.optional(),
  orderBy: z.union([ CardOrderByWithRelationInputSchema.array(),CardOrderByWithRelationInputSchema ]).optional(),
  cursor: CardWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CardScalarFieldEnumSchema,CardScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const CardFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CardFindFirstOrThrowArgs> = z.object({
  select: CardSelectSchema.optional(),
  include: CardIncludeSchema.optional(),
  where: CardWhereInputSchema.optional(),
  orderBy: z.union([ CardOrderByWithRelationInputSchema.array(),CardOrderByWithRelationInputSchema ]).optional(),
  cursor: CardWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CardScalarFieldEnumSchema,CardScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const CardFindManyArgsSchema: z.ZodType<Prisma.CardFindManyArgs> = z.object({
  select: CardSelectSchema.optional(),
  include: CardIncludeSchema.optional(),
  where: CardWhereInputSchema.optional(),
  orderBy: z.union([ CardOrderByWithRelationInputSchema.array(),CardOrderByWithRelationInputSchema ]).optional(),
  cursor: CardWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CardScalarFieldEnumSchema,CardScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const CardAggregateArgsSchema: z.ZodType<Prisma.CardAggregateArgs> = z.object({
  where: CardWhereInputSchema.optional(),
  orderBy: z.union([ CardOrderByWithRelationInputSchema.array(),CardOrderByWithRelationInputSchema ]).optional(),
  cursor: CardWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const CardGroupByArgsSchema: z.ZodType<Prisma.CardGroupByArgs> = z.object({
  where: CardWhereInputSchema.optional(),
  orderBy: z.union([ CardOrderByWithAggregationInputSchema.array(),CardOrderByWithAggregationInputSchema ]).optional(),
  by: CardScalarFieldEnumSchema.array(),
  having: CardScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const CardFindUniqueArgsSchema: z.ZodType<Prisma.CardFindUniqueArgs> = z.object({
  select: CardSelectSchema.optional(),
  include: CardIncludeSchema.optional(),
  where: CardWhereUniqueInputSchema,
}).strict()

export const CardFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CardFindUniqueOrThrowArgs> = z.object({
  select: CardSelectSchema.optional(),
  include: CardIncludeSchema.optional(),
  where: CardWhereUniqueInputSchema,
}).strict()

export const TransactionFindFirstArgsSchema: z.ZodType<Prisma.TransactionFindFirstArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  where: TransactionWhereInputSchema.optional(),
  orderBy: z.union([ TransactionOrderByWithRelationInputSchema.array(),TransactionOrderByWithRelationInputSchema ]).optional(),
  cursor: TransactionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TransactionScalarFieldEnumSchema,TransactionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const TransactionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TransactionFindFirstOrThrowArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  where: TransactionWhereInputSchema.optional(),
  orderBy: z.union([ TransactionOrderByWithRelationInputSchema.array(),TransactionOrderByWithRelationInputSchema ]).optional(),
  cursor: TransactionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TransactionScalarFieldEnumSchema,TransactionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const TransactionFindManyArgsSchema: z.ZodType<Prisma.TransactionFindManyArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  where: TransactionWhereInputSchema.optional(),
  orderBy: z.union([ TransactionOrderByWithRelationInputSchema.array(),TransactionOrderByWithRelationInputSchema ]).optional(),
  cursor: TransactionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TransactionScalarFieldEnumSchema,TransactionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const TransactionAggregateArgsSchema: z.ZodType<Prisma.TransactionAggregateArgs> = z.object({
  where: TransactionWhereInputSchema.optional(),
  orderBy: z.union([ TransactionOrderByWithRelationInputSchema.array(),TransactionOrderByWithRelationInputSchema ]).optional(),
  cursor: TransactionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const TransactionGroupByArgsSchema: z.ZodType<Prisma.TransactionGroupByArgs> = z.object({
  where: TransactionWhereInputSchema.optional(),
  orderBy: z.union([ TransactionOrderByWithAggregationInputSchema.array(),TransactionOrderByWithAggregationInputSchema ]).optional(),
  by: TransactionScalarFieldEnumSchema.array(),
  having: TransactionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const TransactionFindUniqueArgsSchema: z.ZodType<Prisma.TransactionFindUniqueArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  where: TransactionWhereUniqueInputSchema,
}).strict()

export const TransactionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TransactionFindUniqueOrThrowArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  where: TransactionWhereUniqueInputSchema,
}).strict()

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
}).strict()

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
  create: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
  update: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
}).strict()

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict()

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
  where: AccountWhereUniqueInputSchema,
}).strict()

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
}).strict()

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
}).strict()

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
}).strict()

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict()

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
}).strict()

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
}).strict()

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]).optional(),
}).strict()

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict()

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict()

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict()

export const VerificationTokenCreateArgsSchema: z.ZodType<Prisma.VerificationTokenCreateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
}).strict()

export const VerificationTokenUpsertArgsSchema: z.ZodType<Prisma.VerificationTokenUpsertArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
  create: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
  update: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
}).strict()

export const VerificationTokenCreateManyArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyArgs> = z.object({
  data: z.union([ VerificationTokenCreateManyInputSchema,VerificationTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const VerificationTokenDeleteArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const VerificationTokenUpdateArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const VerificationTokenUpdateManyArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyArgs> = z.object({
  data: z.union([ VerificationTokenUpdateManyMutationInputSchema,VerificationTokenUncheckedUpdateManyInputSchema ]),
  where: VerificationTokenWhereInputSchema.optional(),
}).strict()

export const VerificationTokenDeleteManyArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteManyArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
}).strict()

export const CardCreateArgsSchema: z.ZodType<Prisma.CardCreateArgs> = z.object({
  select: CardSelectSchema.optional(),
  include: CardIncludeSchema.optional(),
  data: z.union([ CardCreateInputSchema,CardUncheckedCreateInputSchema ]),
}).strict()

export const CardUpsertArgsSchema: z.ZodType<Prisma.CardUpsertArgs> = z.object({
  select: CardSelectSchema.optional(),
  include: CardIncludeSchema.optional(),
  where: CardWhereUniqueInputSchema,
  create: z.union([ CardCreateInputSchema,CardUncheckedCreateInputSchema ]),
  update: z.union([ CardUpdateInputSchema,CardUncheckedUpdateInputSchema ]),
}).strict()

export const CardCreateManyArgsSchema: z.ZodType<Prisma.CardCreateManyArgs> = z.object({
  data: z.union([ CardCreateManyInputSchema,CardCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const CardDeleteArgsSchema: z.ZodType<Prisma.CardDeleteArgs> = z.object({
  select: CardSelectSchema.optional(),
  include: CardIncludeSchema.optional(),
  where: CardWhereUniqueInputSchema,
}).strict()

export const CardUpdateArgsSchema: z.ZodType<Prisma.CardUpdateArgs> = z.object({
  select: CardSelectSchema.optional(),
  include: CardIncludeSchema.optional(),
  data: z.union([ CardUpdateInputSchema,CardUncheckedUpdateInputSchema ]),
  where: CardWhereUniqueInputSchema,
}).strict()

export const CardUpdateManyArgsSchema: z.ZodType<Prisma.CardUpdateManyArgs> = z.object({
  data: z.union([ CardUpdateManyMutationInputSchema,CardUncheckedUpdateManyInputSchema ]),
  where: CardWhereInputSchema.optional(),
}).strict()

export const CardDeleteManyArgsSchema: z.ZodType<Prisma.CardDeleteManyArgs> = z.object({
  where: CardWhereInputSchema.optional(),
}).strict()

export const TransactionCreateArgsSchema: z.ZodType<Prisma.TransactionCreateArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  data: z.union([ TransactionCreateInputSchema,TransactionUncheckedCreateInputSchema ]),
}).strict()

export const TransactionUpsertArgsSchema: z.ZodType<Prisma.TransactionUpsertArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  where: TransactionWhereUniqueInputSchema,
  create: z.union([ TransactionCreateInputSchema,TransactionUncheckedCreateInputSchema ]),
  update: z.union([ TransactionUpdateInputSchema,TransactionUncheckedUpdateInputSchema ]),
}).strict()

export const TransactionCreateManyArgsSchema: z.ZodType<Prisma.TransactionCreateManyArgs> = z.object({
  data: z.union([ TransactionCreateManyInputSchema,TransactionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const TransactionDeleteArgsSchema: z.ZodType<Prisma.TransactionDeleteArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  where: TransactionWhereUniqueInputSchema,
}).strict()

export const TransactionUpdateArgsSchema: z.ZodType<Prisma.TransactionUpdateArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  data: z.union([ TransactionUpdateInputSchema,TransactionUncheckedUpdateInputSchema ]),
  where: TransactionWhereUniqueInputSchema,
}).strict()

export const TransactionUpdateManyArgsSchema: z.ZodType<Prisma.TransactionUpdateManyArgs> = z.object({
  data: z.union([ TransactionUpdateManyMutationInputSchema,TransactionUncheckedUpdateManyInputSchema ]),
  where: TransactionWhereInputSchema.optional(),
}).strict()

export const TransactionDeleteManyArgsSchema: z.ZodType<Prisma.TransactionDeleteManyArgs> = z.object({
  where: TransactionWhereInputSchema.optional(),
}).strict()