.next/dev/types/validator.ts(206,39): error TS2306: File 'D:/KPZsProductions/Aplikacje Webowe/Instra/app/(pages)/contact/page.tsx' is not a module.
.next/types/validator.ts(152,39): error TS2307: Cannot find module '../../app/page.js' or its corresponding type declarations.
features/campaigns/validation.ts(35,16): error TS2554: Expected 2-3 arguments, but got 1.
lib/api/campaigns.ts(4,15): error TS2305: Module '"@prisma/client"' has no exported member 'Campaign'.
lib/api/campaigns.ts(4,25): error TS2305: Module '"@prisma/client"' has no exported member 'CampaignRun'.
lib/api/campaigns.ts(4,38): error TS2305: Module '"@prisma/client"' has no exported member 'CampaignStatus'.
lib/api/campaigns.ts(30,17): error TS2339: Property 'campaign' does not exist on type 'PrismaClient<PrismaClientOptions, never, DefaultArgs>'.
lib/api/campaigns.ts(46,17): error TS2339: Property 'campaign' does not exist on type 'PrismaClient<PrismaClientOptions, never, DefaultArgs>'.
lib/api/campaigns.ts(60,17): error TS2339: Property 'campaign' does not exist on type 'PrismaClient<PrismaClientOptions, never, DefaultArgs>'.
lib/api/campaigns.ts(79,17): error TS2339: Property 'campaign' does not exist on type 'PrismaClient<PrismaClientOptions, never, DefaultArgs>'.
lib/api/campaigns.ts(103,17): error TS2339: Property 'campaign' does not exist on type 'PrismaClient<PrismaClientOptions, never, DefaultArgs>'.
lib/api/campaigns.ts(116,16): error TS2339: Property 'campaign' does not exist on type 'PrismaClient<PrismaClientOptions, never, DefaultArgs>'.
lib/api/campaigns.ts(135,17): error TS2339: Property 'campaignRun' does not exist on type 'PrismaClient<PrismaClientOptions, never, DefaultArgs>'.
lib/api/campaigns.ts(159,17): error TS2339: Property 'campaign' does not exist on type 'PrismaClient<PrismaClientOptions, never, DefaultArgs>'.
lib/auth/config.ts(33,13): error TS2322: Type '(credentials: Partial<Record<"password" | "email", unknown>>) => Promise<{ id: string; email: string | null; name: string | null; image: string | null; role: UserRole; } | null>' is not assignable to type '(credentials: Partial<Record<"password" | "email", unknown>>, request: Request) => Awaitable<User | null>'.
  Type 'Promise<{ id: string; email: string | null; name: string | null; image: string | null; role: UserRole; } | null>' is not assignable to type 'Awaitable<User | null>'.
    Type 'Promise<{ id: string; email: string | null; name: string | null; image: string | null; role: UserRole; } | null>' is not assignable to type 'PromiseLike<User | null>'.
      Types of property 'then' are incompatible.
        Type '<TResult1 = { id: string; email: string | null; name: string | null; image: string | null; role: UserRole; } | null, TResult2 = never>(onfulfilled?: ((value: { id: string; email: string | null; name: string | null; image: string | null; role: UserRole; } | null) => TResult1 | PromiseLike<...>) | null | undefined, on...' is not assignable to type '<TResult1 = User | null, TResult2 = never>(onfulfilled?: ((value: User | null) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<...>) | null | undefined) => PromiseLike<...>'.
          Types of parameters 'onfulfilled' and 'onfulfilled' are incompatible.
            Types of parameters 'value' and 'value' are incompatible.
              Type '{ id: string; email: string | null; name: string | null; image: string | null; role: UserRole; } | null' is not assignable to type 'User | null'.
                Type '{ id: string; email: string | null; name: string | null; image: string | null; role: $Enums.UserRole; }' is not assignable to type 'User'.
                  Types of property 'role' are incompatible.
                    Type 'UserRole' is not assignable to type 'UserRole | undefined'.
                      Type '"USER"' is not assignable to type 'UserRole | undefined'.
lib/campaigns/handlers.ts(5,15): error TS2305: Module '"@prisma/client"' has no exported member 'Campaign'.
lib/campaigns/handlers.ts(5,25): error TS2305: Module '"@prisma/client"' has no exported member 'CampaignAction'.
lib/i18n/config.ts(17,30): error TS2769: No overload matches this call.
  Overload 1 of 2, '(callback?: Callback | undefined): Promise<TFunction<"translation", undefined>>', gave the following error.
    Object literal may only specify known properties, and 'resources' does not exist in type 'Callback'.
  Overload 2 of 2, '(options: InitOptions<unknown>, callback?: Callback | undefined): Promise<TFunction<"translation", undefined>>', gave the following error.
    Object literal may only specify known properties, and 'initImmediate' does not exist in type 'InitOptions<unknown>'.
lib/plugins/audit.test.ts(26,30): error TS2345: Argument of type '{}' is not assignable to parameter of type '{ id: string; createdAt: Date; userId: string | null; pluginId: string; action: string; metadata: JsonValue; }'.
  Type '{}' is missing the following properties from type '{ id: string; createdAt: Date; userId: string | null; pluginId: string; action: string; metadata: JsonValue; }': id, createdAt, userId, pluginId, and 2 more.
lib/plugins/audit.test.ts(35,33): error TS2739: Type '{ action: string; }' is missing the following properties from type '{ id: string; createdAt: Date; userId: string | null; pluginId: string; action: string; metadata: JsonValue; }': id, createdAt, userId, pluginId, metadata
lib/plugins/audit.ts(18,39): error TS2322: Type 'Record<string, unknown> | null' is not assignable to type 'NullableJsonNullValueInput | InputJsonValue | undefined'.
  Type 'null' is not assignable to type 'NullableJsonNullValueInput | InputJsonValue | undefined'.
lib/plugins/installations.ts(4,20): error TS7016: Could not find a declaration file for module 'semver'. 'D:/KPZsProductions/Aplikacje Webowe/Instra/node_modules/semver/semver.js' implicitly has an 'any' type.
  Try `npm i --save-dev @types/semver` if it exists or add a new declaration (.d.ts) file containing `declare module 'semver';`
lib/plugins/kv.test.ts(14,14): error TS2339: Property 'mockReset' does not exist on type '<T extends PluginDataFindUniqueArgs>(args: SelectSubset<T, PluginDataFindUniqueArgs<DefaultArgs>>) => Prisma__PluginDataClient<GetFindResult<$PluginDataPayload<DefaultArgs>, T, PrismaClientOptions> | null, null, DefaultArgs, PrismaClientOptions>'.
lib/plugins/kv.test.ts(15,10): error TS2339: Property 'mockReset' does not exist on type '<T extends PluginDataUpsertArgs>(args: SelectSubset<T, PluginDataUpsertArgs<DefaultArgs>>) => Prisma__PluginDataClient<GetFindResult<$PluginDataPayload<DefaultArgs>, T, PrismaClientOptions>, never, DefaultArgs, PrismaClientOptions>'.
lib/plugins/kv.test.ts(20,16): error TS2339: Property 'mockResolvedValue' does not exist on type '<T extends PluginDataFindUniqueArgs>(args: SelectSubset<T, PluginDataFindUniqueArgs<DefaultArgs>>) => Prisma__PluginDataClient<GetFindResult<$PluginDataPayload<DefaultArgs>, T, PrismaClientOptions> | null, null, DefaultArgs, PrismaClientOptions>'.
lib/plugins/kv.test.ts(26,16): error TS2339: Property 'mockResolvedValue' does not exist on type '<T extends PluginDataFindUniqueArgs>(args: SelectSubset<T, PluginDataFindUniqueArgs<DefaultArgs>>) => Prisma__PluginDataClient<GetFindResult<$PluginDataPayload<DefaultArgs>, T, PrismaClientOptions> | null, null, DefaultArgs, PrismaClientOptions>'.
lib/plugins/kv.test.ts(32,12): error TS2339: Property 'mockResolvedValue' does not exist on type '<T extends PluginDataUpsertArgs>(args: SelectSubset<T, PluginDataUpsertArgs<DefaultArgs>>) => Prisma__PluginDataClient<GetFindResult<$PluginDataPayload<DefaultArgs>, T, PrismaClientOptions>, never, DefaultArgs, PrismaClientOptions>'.
lib/plugins/kv.ts(33,38): error TS2322: Type 'unknown' is not assignable to type 'JsonNull | InputJsonValue'.
lib/plugins/kv.ts(34,15): error TS2322: Type 'unknown' is not assignable to type 'JsonNull | InputJsonValue | undefined'.
prisma/seed-admin.ts(37,44): error TS2769: No overload matches this call.
  Overload 1 of 2, '(password: string, salt: string | number): Promise<string>', gave the following error.
    Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
      Type 'undefined' is not assignable to type 'string'.
  Overload 2 of 2, '(password: string, salt: string | number, callback?: Callback<string> | undefined, progressCallback?: ProgressCallback | undefined): void', gave the following error.
    Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
      Type 'undefined' is not assignable to type 'string'.
prisma/seed-admin.ts(43,9): error TS2322: Type 'Promise<string> & void' is not assignable to type 'string | null | undefined'.
types/auth.ts(1,26): error TS2724: '"next-auth"' has no exported member named 'DefaultJWT'. Did you mean 'NextAuth'?
types/auth.ts(23,16): error TS2664: Invalid module name in augmentation, module 'next-auth/jwt' cannot be found.
vitest.config.ts(9,5): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Object literal may only specify known properties, and 'poolMatchGlobs' does not exist in type 'InlineConfig'.
