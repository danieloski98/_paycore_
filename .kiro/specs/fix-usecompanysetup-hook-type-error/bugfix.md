# Bugfix Requirements Document

## Introduction

The `useCompanySetup` hook has a TypeScript type error where the useMutation hook is incorrectly typed to accept only a single parameter of type `CompanyUserSetupPayload`, but the underlying `company_user_setup` service function requires two parameters: `userId: string` and `payload: CompanyUserSetupPayload`. This causes a compilation error: "Argument of type 'CompanyUserSetupPayload' is not assignable to parameter of type 'string'". The hook should accept a single object that combines both `userId` and the payload properties.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN `useMutation` is typed with single generic parameter `CompanyUserSetupPayload` THEN the system produces TypeScript error because `userId` parameter is incorrectly typed as `CompanyUserSetupPayload` instead of `string`

1.2 WHEN the hook's mutation function receives parameters THEN the first parameter is incorrectly interpreted as `CompanyUserSetupPayload` causing type mismatch with expected `string` type for `userId`

1.3 WHEN React components call the hook THEN they cannot properly pass both `userId` and payload in a single object

### Expected Behavior (Correct)

2.1 WHEN `useMutation` is typed for the hook THEN the generic type should properly accept a single object containing both `userId: string` and payload properties

2.2 WHEN the hook's mutation function receives parameters THEN it should extract `userId` and payload from the single object and call `company_user_setup(userId, payload)`

2.3 WHEN React components use the hook THEN they should pass a single object with both `userId` and payload properties

### Unchanged Behavior (Regression Prevention)

3.1 WHEN other auth hooks are used THEN the system SHALL CONTINUE TO work without type errors

3.2 WHEN the hook is called without proper parameters THEN the system SHALL CONTINUE TO provide appropriate TypeScript errors

3.3 WHEN TypeScript strict mode is enabled THEN the system SHALL CONTINUE TO enforce proper type checking