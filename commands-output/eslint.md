
D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a2b95d6793f4e08c4\app\(auth)\forgot-password\page.tsx
  43:22  warning  Compilation Skipped: Use of incompatible library

This API returns functions which cannot be memoized without leading to stale UI. To prevent this, by default React Compiler will skip memoizing this component/hook. However, you may see issues if values from this API are passed to other components/hooks that are memoized.

D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a2b95d6793f4e08c4\app\(auth)\forgot-password\page.tsx:43:22
  41 |   })
  42 |
> 43 |   const emailValue = watch('email', '')
     |                      ^^^^^ React Hook Form's `useForm()` API returns a `watch()` function which cannot be memoized safely.
  44 |
  45 |   useEffect(() => {
  46 |     emailRef.current?.focus()  react-hooks/incompatible-library

D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a2b95d6793f4e08c4\app\(auth)\reset-password\page.tsx
  150:32  error  Error: Cannot access refs during render

React refs are values that are not needed for rendering. Refs should only be accessed outside of render, such as in event handlers or effects. Accessing a ref value (the `current` property) during render can cause your component not to update as expected (https://react.dev/reference/react/useRef).

D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a2b95d6793f4e08c4\app\(auth)\reset-password\page.tsx:150:32
  148 |         ref={formRef}
  149 |         action={formAction}
> 150 |         onSubmit={handleSubmit(onClientSubmit)}
      |                                ^^^^^^^^^^^^^^ Passing a ref to a function may read its value during render
  151 |         className="mb-5 flex flex-col gap-4"
  152 |         noValidate
  153 |       >  react-hooks/refs
  323:49  error  `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   react/no-unescaped-entities

D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a2b95d6793f4e08c4\app\(auth)\signin\page.tsx
  117:36  error  Error: Cannot access refs during render

React refs are values that are not needed for rendering. Refs should only be accessed outside of render, such as in event handlers or effects. Accessing a ref value (the `current` property) during render can cause your component not to update as expected (https://react.dev/reference/react/useRef).

D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a2b95d6793f4e08c4\app\(auth)\signin\page.tsx:117:36
  115 |             ref={formRef}
  116 |             action={formAction}
> 117 |             onSubmit={handleSubmit(onClientSubmit)}
      |                                    ^^^^^^^^^^^^^^ Passing a ref to a function may read its value during render
  118 |             className="mb-5 flex flex-col gap-4"
  119 |             noValidate
  120 |           >  react-hooks/refs

D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a2b95d6793f4e08c4\app\(auth)\signup\page.tsx
  107:24  warning  Compilation Skipped: Use of incompatible library

This API returns functions which cannot be memoized without leading to stale UI. To prevent this, by default React Compiler will skip memoizing this component/hook. However, you may see issues if values from this API are passed to other components/hooks that are memoized.

D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a2b95d6793f4e08c4\app\(auth)\signup\page.tsx:107:24
  105 |   })
  106 |
> 107 |   const termsChecked = watch('terms') === true
      |                        ^^^^^ React Hook Form's `useForm()` API returns a `watch()` function which cannot be memoized safely.
  108 |
  109 |   /** Show only _form-level server errors as toasts; field errors shown inline. */
  110 |   useEffect(() => {  react-hooks/incompatible-library

D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a2b95d6793f4e08c4\app\(auth)\verify-email\page.tsx
  54:5  error    Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a2b95d6793f4e08c4\app\(auth)\verify-email\page.tsx:54:5
  52 |   // Start cooldown on initial load (code was just sent by registerUser)
  53 |   useEffect(() => {
> 54 |     startCooldown()
     |     ^^^^^^^^^^^^^ Avoid calling setState() directly within an effect
  55 |     return () => {
  56 |       if (cooldownRef.current) clearInterval(cooldownRef.current)
  57 |     }     react-hooks/set-state-in-effect
  58:5  warning  Unused eslint-disable directive (no problems were reported from 'react-hooks/exhaustive-deps')
  74:7  error    Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a2b95d6793f4e08c4\app\(auth)\verify-email\page.tsx:74:7
  72 |     if (resendState.success) {
  73 |       toast.success(t('verify_email.resend_success'))
> 74 |       startCooldown()
     |       ^^^^^^^^^^^^^ Avoid calling setState() directly within an effect
  75 |     }
  76 |     if (resendState.errors?._form?.length) {
  77 |       toast.error(resendState.errors._form[0])  react-hooks/set-state-in-effect

D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a2b95d6793f4e08c4\app\(dashboard)\dashboard\admin\plugins\page.tsx
  43:10  error  Comments inside children section of tag should be placed inside braces  react/jsx-no-comment-textnodes

D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a2b95d6793f4e08c4\app\(dashboard)\dashboard\plugins\page.tsx
  70:12  error  Comments inside children section of tag should be placed inside braces  react/jsx-no-comment-textnodes

D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a2b95d6793f4e08c4\components\dashboard\DashboardSidebar.tsx
  71:10  error  Comments inside children section of tag should be placed inside braces  react/jsx-no-comment-textnodes

D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a2b95d6793f4e08c4\components\dashboard\DashboardWidgetSlot.tsx
  34:12  error  Comments inside children section of tag should be placed inside braces  react/jsx-no-comment-textnodes
  56:8   error  Comments inside children section of tag should be placed inside braces  react/jsx-no-comment-textnodes

D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a2b95d6793f4e08c4\components\dashboard\plugins\MySubmissionsSection.tsx
  47:8  error  Comments inside children section of tag should be placed inside braces  react/jsx-no-comment-textnodes

D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a2b95d6793f4e08c4\components\ui\AboutPlugins.tsx
   16:11  error    An empty interface declaration allows any non-nullish value, including literals like `0` and `""`.
- If that's what you want, disable this lint rule with an inline comment or configure the 'allowInterfaces' rule option.
- If you want a type meaning "any object", you probably want `object` instead.
- If you want a type meaning "any value", you probably want `unknown` instead  @typescript-eslint/no-empty-object-type
  167:38  warning  '_props' is defined but never used                                                                                                                                                                                                                                                                                                                                                        @typescript-eslint/no-unused-vars

D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a2b95d6793f4e08c4\components\ui\Marquee.tsx
  56:11  error  `"` can be escaped with `&quot;`, `&ldquo;`, `&#34;`, `&rdquo;`  react/no-unescaped-entities
  56:25  error  `"` can be escaped with `&quot;`, `&ldquo;`, `&#34;`, `&rdquo;`  react/no-unescaped-entities

D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a2b95d6793f4e08c4\components\ui\PricingPlans.tsx
  64:122  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a2b95d6793f4e08c4\scripts\seed-admin.mjs
  6:10  warning  'createHash' is defined but never used  @typescript-eslint/no-unused-vars

D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a89c76112ca275044\app\(auth)\forgot-password\page.tsx
  43:22  warning  Compilation Skipped: Use of incompatible library

This API returns functions which cannot be memoized without leading to stale UI. To prevent this, by default React Compiler will skip memoizing this component/hook. However, you may see issues if values from this API are passed to other components/hooks that are memoized.

D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a89c76112ca275044\app\(auth)\forgot-password\page.tsx:43:22
  41 |   })
  42 |
> 43 |   const emailValue = watch('email', '')
     |                      ^^^^^ React Hook Form's `useForm()` API returns a `watch()` function which cannot be memoized safely.
  44 |
  45 |   useEffect(() => {
  46 |     emailRef.current?.focus()  react-hooks/incompatible-library

D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a89c76112ca275044\app\(auth)\reset-password\page.tsx
  150:32  error  Error: Cannot access refs during render

React refs are values that are not needed for rendering. Refs should only be accessed outside of render, such as in event handlers or effects. Accessing a ref value (the `current` property) during render can cause your component not to update as expected (https://react.dev/reference/react/useRef).

D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a89c76112ca275044\app\(auth)\reset-password\page.tsx:150:32
  148 |         ref={formRef}
  149 |         action={formAction}
> 150 |         onSubmit={handleSubmit(onClientSubmit)}
      |                                ^^^^^^^^^^^^^^ Passing a ref to a function may read its value during render
  151 |         className="mb-5 flex flex-col gap-4"
  152 |         noValidate
  153 |       >  react-hooks/refs
  323:49  error  `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   react/no-unescaped-entities

D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a89c76112ca275044\app\(auth)\signin\page.tsx
  117:36  error  Error: Cannot access refs during render

React refs are values that are not needed for rendering. Refs should only be accessed outside of render, such as in event handlers or effects. Accessing a ref value (the `current` property) during render can cause your component not to update as expected (https://react.dev/reference/react/useRef).

D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a89c76112ca275044\app\(auth)\signin\page.tsx:117:36
  115 |             ref={formRef}
  116 |             action={formAction}
> 117 |             onSubmit={handleSubmit(onClientSubmit)}
      |                                    ^^^^^^^^^^^^^^ Passing a ref to a function may read its value during render
  118 |             className="mb-5 flex flex-col gap-4"
  119 |             noValidate
  120 |           >  react-hooks/refs

D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a89c76112ca275044\app\(auth)\signup\page.tsx
  107:24  warning  Compilation Skipped: Use of incompatible library

This API returns functions which cannot be memoized without leading to stale UI. To prevent this, by default React Compiler will skip memoizing this component/hook. However, you may see issues if values from this API are passed to other components/hooks that are memoized.

D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a89c76112ca275044\app\(auth)\signup\page.tsx:107:24
  105 |   })
  106 |
> 107 |   const termsChecked = watch('terms') === true
      |                        ^^^^^ React Hook Form's `useForm()` API returns a `watch()` function which cannot be memoized safely.
  108 |
  109 |   /** Show only _form-level server errors as toasts; field errors shown inline. */
  110 |   useEffect(() => {  react-hooks/incompatible-library

D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a89c76112ca275044\app\(auth)\verify-email\page.tsx
  54:5  error    Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a89c76112ca275044\app\(auth)\verify-email\page.tsx:54:5
  52 |   // Start cooldown on initial load (code was just sent by registerUser)
  53 |   useEffect(() => {
> 54 |     startCooldown()
     |     ^^^^^^^^^^^^^ Avoid calling setState() directly within an effect
  55 |     return () => {
  56 |       if (cooldownRef.current) clearInterval(cooldownRef.current)
  57 |     }     react-hooks/set-state-in-effect
  58:5  warning  Unused eslint-disable directive (no problems were reported from 'react-hooks/exhaustive-deps')
  74:7  error    Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a89c76112ca275044\app\(auth)\verify-email\page.tsx:74:7
  72 |     if (resendState.success) {
  73 |       toast.success(t('verify_email.resend_success'))
> 74 |       startCooldown()
     |       ^^^^^^^^^^^^^ Avoid calling setState() directly within an effect
  75 |     }
  76 |     if (resendState.errors?._form?.length) {
  77 |       toast.error(resendState.errors._form[0])  react-hooks/set-state-in-effect

D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a89c76112ca275044\app\(dashboard)\dashboard\admin\plugins\page.tsx
  43:10  error  Comments inside children section of tag should be placed inside braces  react/jsx-no-comment-textnodes

D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a89c76112ca275044\app\(dashboard)\dashboard\plugins\page.tsx
  70:12  error  Comments inside children section of tag should be placed inside braces  react/jsx-no-comment-textnodes

D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a89c76112ca275044\app\(dashboard)\dashboard\settings\page.tsx
  21:34  error  Error: Cannot call impure function during render

`Date.now` is an impure function. Calling an impure function can produce unstable results that update unpredictably when the component happens to re-render. (https://react.dev/reference/rules/components-and-hooks-must-be-pure#components-and-hooks-must-be-idempotent).

D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a89c76112ca275044\app\(dashboard)\dashboard\settings\page.tsx:21:34
  19 |     where: {
  20 |       userId: user.id,
> 21 |       createdAt: { gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) },
     |                                  ^^^^^^^^^^ Cannot call impure function
  22 |     },
  23 |   })
  24 |  react-hooks/purity

D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a89c76112ca275044\components\dashboard\DashboardSidebar.tsx
  73:10  error  Comments inside children section of tag should be placed inside braces  react/jsx-no-comment-textnodes

D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a89c76112ca275044\components\dashboard\DashboardWidgetSlot.tsx
  34:12  error  Comments inside children section of tag should be placed inside braces  react/jsx-no-comment-textnodes
  56:8   error  Comments inside children section of tag should be placed inside braces  react/jsx-no-comment-textnodes

D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a89c76112ca275044\components\dashboard\plugins\MySubmissionsSection.tsx
  47:8  error  Comments inside children section of tag should be placed inside braces  react/jsx-no-comment-textnodes

D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a89c76112ca275044\components\ui\AboutPlugins.tsx
   16:11  error    An empty interface declaration allows any non-nullish value, including literals like `0` and `""`.
- If that's what you want, disable this lint rule with an inline comment or configure the 'allowInterfaces' rule option.
- If you want a type meaning "any object", you probably want `object` instead.
- If you want a type meaning "any value", you probably want `unknown` instead  @typescript-eslint/no-empty-object-type
  167:38  warning  '_props' is defined but never used                                                                                                                                                                                                                                                                                                                                                        @typescript-eslint/no-unused-vars

D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a89c76112ca275044\components\ui\Marquee.tsx
  56:11  error  `"` can be escaped with `&quot;`, `&ldquo;`, `&#34;`, `&rdquo;`  react/no-unescaped-entities
  56:25  error  `"` can be escaped with `&quot;`, `&ldquo;`, `&#34;`, `&rdquo;`  react/no-unescaped-entities

D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a89c76112ca275044\components\ui\PricingPlans.tsx
  64:122  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

D:\KPZsProductions\Aplikacje Webowe\Instra\.claude\worktrees\agent-a89c76112ca275044\scripts\seed-admin.mjs
  6:10  warning  'createHash' is defined but never used  @typescript-eslint/no-unused-vars

D:\KPZsProductions\Aplikacje Webowe\Instra\app\(auth)\forgot-password\page.tsx
  43:22  warning  Compilation Skipped: Use of incompatible library

This API returns functions which cannot be memoized without leading to stale UI. To prevent this, by default React Compiler will skip memoizing this component/hook. However, you may see issues if values from this API are passed to other components/hooks that are memoized.

D:\KPZsProductions\Aplikacje Webowe\Instra\app\(auth)\forgot-password\page.tsx:43:22
  41 |   })
  42 |
> 43 |   const emailValue = watch('email', '')
     |                      ^^^^^ React Hook Form's `useForm()` API returns a `watch()` function which cannot be memoized safely.
  44 |
  45 |   useEffect(() => {
  46 |     emailRef.current?.focus()  react-hooks/incompatible-library

D:\KPZsProductions\Aplikacje Webowe\Instra\app\(auth)\reset-password\page.tsx
  150:32  error  Error: Cannot access refs during render

React refs are values that are not needed for rendering. Refs should only be accessed outside of render, such as in event handlers or effects. Accessing a ref value (the `current` property) during render can cause your component not to update as expected (https://react.dev/reference/react/useRef).

D:\KPZsProductions\Aplikacje Webowe\Instra\app\(auth)\reset-password\page.tsx:150:32
  148 |         ref={formRef}
  149 |         action={formAction}
> 150 |         onSubmit={handleSubmit(onClientSubmit)}
      |                                ^^^^^^^^^^^^^^ Passing a ref to a function may read its value during render
  151 |         className="mb-5 flex flex-col gap-4"
  152 |         noValidate
  153 |       >  react-hooks/refs
  323:49  error  `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         react/no-unescaped-entities

D:\KPZsProductions\Aplikacje Webowe\Instra\app\(auth)\signin\page.tsx
  117:36  error  Error: Cannot access refs during render

React refs are values that are not needed for rendering. Refs should only be accessed outside of render, such as in event handlers or effects. Accessing a ref value (the `current` property) during render can cause your component not to update as expected (https://react.dev/reference/react/useRef).

D:\KPZsProductions\Aplikacje Webowe\Instra\app\(auth)\signin\page.tsx:117:36
  115 |             ref={formRef}
  116 |             action={formAction}
> 117 |             onSubmit={handleSubmit(onClientSubmit)}
      |                                    ^^^^^^^^^^^^^^ Passing a ref to a function may read its value during render
  118 |             className="mb-5 flex flex-col gap-4"
  119 |             noValidate
  120 |           >  react-hooks/refs

D:\KPZsProductions\Aplikacje Webowe\Instra\app\(auth)\signup\page.tsx
  107:24  warning  Compilation Skipped: Use of incompatible library

This API returns functions which cannot be memoized without leading to stale UI. To prevent this, by default React Compiler will skip memoizing this component/hook. However, you may see issues if values from this API are passed to other components/hooks that are memoized.

D:\KPZsProductions\Aplikacje Webowe\Instra\app\(auth)\signup\page.tsx:107:24
  105 |   })
  106 |
> 107 |   const termsChecked = watch('terms') === true
      |                        ^^^^^ React Hook Form's `useForm()` API returns a `watch()` function which cannot be memoized safely.
  108 |
  109 |   /** Show only _form-level server errors as toasts; field errors shown inline. */
  110 |   useEffect(() => {  react-hooks/incompatible-library

D:\KPZsProductions\Aplikacje Webowe\Instra\app\(auth)\verify-email\page.tsx
  54:5  error    Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

D:\KPZsProductions\Aplikacje Webowe\Instra\app\(auth)\verify-email\page.tsx:54:5
  52 |   // Start cooldown on initial load (code was just sent by registerUser)
  53 |   useEffect(() => {
> 54 |     startCooldown()
     |     ^^^^^^^^^^^^^ Avoid calling setState() directly within an effect
  55 |     return () => {
  56 |       if (cooldownRef.current) clearInterval(cooldownRef.current)
  57 |     }     react-hooks/set-state-in-effect
  58:5  warning  Unused eslint-disable directive (no problems were reported from 'react-hooks/exhaustive-deps')
  74:7  error    Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

D:\KPZsProductions\Aplikacje Webowe\Instra\app\(auth)\verify-email\page.tsx:74:7
  72 |     if (resendState.success) {
  73 |       toast.success(t('verify_email.resend_success'))
> 74 |       startCooldown()
     |       ^^^^^^^^^^^^^ Avoid calling setState() directly within an effect
  75 |     }
  76 |     if (resendState.errors?._form?.length) {
  77 |       toast.error(resendState.errors._form[0])  react-hooks/set-state-in-effect

D:\KPZsProductions\Aplikacje Webowe\Instra\app\(dashboard)\dashboard\admin\plugins\page.tsx
  43:10  error  Comments inside children section of tag should be placed inside braces  react/jsx-no-comment-textnodes

D:\KPZsProductions\Aplikacje Webowe\Instra\app\(dashboard)\dashboard\analytics\[postId]\page.tsx
  110:12  error  Comments inside children section of tag should be placed inside braces  react/jsx-no-comment-textnodes

D:\KPZsProductions\Aplikacje Webowe\Instra\app\(dashboard)\dashboard\plugins\page.tsx
  70:12  error  Comments inside children section of tag should be placed inside braces  react/jsx-no-comment-textnodes

D:\KPZsProductions\Aplikacje Webowe\Instra\app\(dashboard)\dashboard\settings\page.tsx
  21:34  error  Error: Cannot call impure function during render

`Date.now` is an impure function. Calling an impure function can produce unstable results that update unpredictably when the component happens to re-render. (https://react.dev/reference/rules/components-and-hooks-must-be-pure#components-and-hooks-must-be-idempotent).

D:\KPZsProductions\Aplikacje Webowe\Instra\app\(dashboard)\dashboard\settings\page.tsx:21:34
  19 |     where: {
  20 |       userId: user.id,
> 21 |       createdAt: { gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) },
     |                                  ^^^^^^^^^^ Cannot call impure function
  22 |     },
  23 |   })
  24 |  react-hooks/purity

D:\KPZsProductions\Aplikacje Webowe\Instra\components\dashboard\DashboardHeader.tsx
  6:16  warning  'Search' is defined but never used  @typescript-eslint/no-unused-vars

D:\KPZsProductions\Aplikacje Webowe\Instra\components\dashboard\DashboardSidebar.tsx
   92:5   error  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

D:\KPZsProductions\Aplikacje Webowe\Instra\components\dashboard\DashboardSidebar.tsx:92:5
  90 |   // Close drawer on navigation
  91 |   useEffect(() => {
> 92 |     setDrawerOpen(false);
     |     ^^^^^^^^^^^^^ Avoid calling setState() directly within an effect
  93 |   }, [pathname]);
  94 |
  95 |   // Prevent body scroll when drawer open  react-hooks/set-state-in-effect
  189:18  error  Comments inside children section of tag should be placed inside braces                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        react/jsx-no-comment-textnodes

D:\KPZsProductions\Aplikacje Webowe\Instra\components\dashboard\DashboardWidgetSlot.tsx
  34:12  error  Comments inside children section of tag should be placed inside braces  react/jsx-no-comment-textnodes
  56:8   error  Comments inside children section of tag should be placed inside braces  react/jsx-no-comment-textnodes

D:\KPZsProductions\Aplikacje Webowe\Instra\components\dashboard\plugins\MySubmissionsSection.tsx
  47:8  error  Comments inside children section of tag should be placed inside braces  react/jsx-no-comment-textnodes

D:\KPZsProductions\Aplikacje Webowe\Instra\components\ui\AboutPlugins.tsx
   16:11  error    An empty interface declaration allows any non-nullish value, including literals like `0` and `""`.
- If that's what you want, disable this lint rule with an inline comment or configure the 'allowInterfaces' rule option.
- If you want a type meaning "any object", you probably want `object` instead.
- If you want a type meaning "any value", you probably want `unknown` instead  @typescript-eslint/no-empty-object-type
  167:38  warning  '_props' is defined but never used                                                                                                                                                                                                                                                                                                                                                        @typescript-eslint/no-unused-vars

D:\KPZsProductions\Aplikacje Webowe\Instra\components\ui\Marquee.tsx
  56:11  error  `"` can be escaped with `&quot;`, `&ldquo;`, `&#34;`, `&rdquo;`  react/no-unescaped-entities
  56:25  error  `"` can be escaped with `&quot;`, `&ldquo;`, `&#34;`, `&rdquo;`  react/no-unescaped-entities

D:\KPZsProductions\Aplikacje Webowe\Instra\components\ui\PricingPlans.tsx
  76:122  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

D:\KPZsProductions\Aplikacje Webowe\Instra\components\ui\analytics\EngagementChart.tsx
  60:27  error  Error: Cannot call impure function during render

`Date.now` is an impure function. Calling an impure function can produce unstable results that update unpredictably when the component happens to re-render. (https://react.dev/reference/rules/components-and-hooks-must-be-pure#components-and-hooks-must-be-idempotent).

D:\KPZsProductions\Aplikacje Webowe\Instra\components\ui\analytics\EngagementChart.tsx:60:27
  58 |
  59 |   const days = RANGE_DAYS[range];
> 60 |   const cutoff = new Date(Date.now() - days * 86_400_000).toISOString().slice(0, 10);
     |                           ^^^^^^^^^^ Cannot call impure function
  61 |   const filtered = series.filter((p) => p.date >= cutoff);
  62 |
  63 |   const isEmpty = filtered.length === 0 && prediction.points.length === 0;  react-hooks/purity

D:\KPZsProductions\Aplikacje Webowe\Instra\components\ui\posts\MediaUploadPreview.tsx
  49:25  error  Error: Cannot access refs during render

React refs are values that are not needed for rendering. Refs should only be accessed outside of render, such as in event handlers or effects. Accessing a ref value (the `current` property) during render can cause your component not to update as expected (https://react.dev/reference/react/useRef).

D:\KPZsProductions\Aplikacje Webowe\Instra\components\ui\posts\MediaUploadPreview.tsx:49:25
  47 |   return (
  48 |     <div className="grid grid-cols-3 gap-2" role="list" aria-label="Selected media previews">
> 49 |       {displayFiles.map((file, i) => {
     |                         ^^^^^^^^^^^^^^
> 50 |         const url = urlsRef.current[i] ?? ''
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 51 |         return (
     …
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 75 |         )
     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 76 |       })}
     | ^^^^^^^^ Cannot access ref value during render
  77 |     </div>
  78 |   )
  79 | }  react-hooks/refs

D:\KPZsProductions\Aplikacje Webowe\Instra\components\ui\posts\PostComposer.tsx
  79:7  error  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

D:\KPZsProductions\Aplikacje Webowe\Instra\components\ui\posts\PostComposer.tsx:79:7
  77 |   useEffect(() => {
  78 |     if (state.success) {
> 79 |       setContent('')
     |       ^^^^^^^^^^ Avoid calling setState() directly within an effect
  80 |       setNewFiles([])
  81 |       setPlatforms([])
  82 |       setPlatformData({})  react-hooks/set-state-in-effect

D:\KPZsProductions\Aplikacje Webowe\Instra\components\ui\posts\PostFeed.tsx
  44:5  error  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

D:\KPZsProductions\Aplikacje Webowe\Instra\components\ui\posts\PostFeed.tsx:44:5
  42 |   // router.refresh() re-renders the server component, which passes new initialPosts here.
  43 |   useEffect(() => {
> 44 |     setPosts(initialPosts)
     |     ^^^^^^^^ Avoid calling setState() directly within an effect
  45 |     setNextCursor(initialNextCursor)
  46 |   }, [initialPosts, initialNextCursor])
  47 |  react-hooks/set-state-in-effect

D:\KPZsProductions\Aplikacje Webowe\Instra\features\analytics\lib\dailyTip.ts
  7:25  warning  'ContentScore' is defined but never used  @typescript-eslint/no-unused-vars

D:\KPZsProductions\Aplikacje Webowe\Instra\scripts\seed-admin.mjs
  6:10  warning  'createHash' is defined but never used  @typescript-eslint/no-unused-vars

✖ 70 problems (53 errors, 17 warnings)
  0 errors and 3 warnings potentially fixable with the `--fix` option.

