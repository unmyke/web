## Тестовое задание

> - [x] для AccessGuard добавить проверку, если есть декоратор AuthAccess, то проверить, чтобы пользователь был авторизован

:sparkles: Также декоратор AuthAccess может принимать список ролей. В этом случае AccessGuard проверяет, что авторизованный пользователь имеет роль, указанную в этом списке.

> - [x] для ResourceGuard добавить логику
>   - [x] Извлечение метаданных из декоратора ResourceAccess
>   - [x] Чекать роли, через accesscontrol
>   - [x] Чекать принадлежность объекта через поле user, оно по идее как овнер

> - [x] реализовать AuthMiddleware, которая будет чекать jwt и складывать user в реквест

> - [x] настроить контекст для graphql, чтобы в него вкладывать user

:sparkles: Также в контекст добавлен accessControl (список доступа приложения).


> - [x] починить регистрацию
>   - [x] Добавить поле для пароля
>   - [x] Использовать bcrypt
>   - [x] Сделать проверку, чтобы не затирать существующих пользователей
>   - [x] Сохранить в бд

> - [x] реализовать команду/хендлер для обновления профиля

> - [x] для UpdateProfileDto нужно будет добавить свойства, которых сейчас нет

> - [x] для всех dto сделать элементарную валидацию

> - [x] для ролей сделать миграцию, которая будет создавать дефолтные роли с заданными пермишенами
>   - [x] для user это будет crud с possession Own
>   - [x] для support это будет crud с possession Any

> - [x] ручка для получения своего профиля

> - [x] ручка для получения списка профилей

> - [x] реализовать хранение данных о последнем входе пользователя, для последующего вывода

> - [x] прикрутить почтовик, который будет слать уведомления

> - [x] реализовать сагу, которая будет триггериться на регистрацию и формировать ивент на отправку письма

## Бонусом

- реализовать 2FA через Google

---

- :sparkles: добавлен модуль `AuthAccessModule`, содержащий:

  - `JwtService`: предоставляет методы кодирования/декодирования JSON web token;
  - `AuthMiddleware`: проверяет наличие у http-запроса authorization-заголовка, заголовок содержит действительный access token и добавляет в http-запрос декодированный JSON web token payload;
  - `AccessGuard`;
  - резолверы для мутаций:
    - `login(input: LoginInput!): LoginPayload!`
    - `register(input: RegisterInput!): RegisterPayload!`
  - обработчики CQRS команд:
    - `LoginUserCommand`;
    - `RegisterUserCommand`;
  - Event Sourcing события:
    - `LoginUserFailedEvent`;
    - `RegisterUserFailedEvent`;
    - `UserLoginedEvent`;
    - `UserRegisteredEvent`;

- :sparkles: добавлен модуль `ResourceAccessModule`, содержащий:

  - `ResourceGuard`;
  - `AccessControlMiidleware`: добавляет в http-запрос экземпляр AccessControl (список доступа приложения);

- :sparkles: изменен подход schema-first на code-first для генерации GraphQL схемы;
- :sparkles: все мутации возвращают payload одной формы для удобства использования на клиенте:

```
{
  recordId: Uuid
  record: Resource
  status: STATUS!
  errors: [ProblemInterface!]
}
```

- общедоступные мутации:

  - `login(input: LoginInput!): LoginPayload!`: изменяет время последнего входа на текущее и возвращает новый access token;
  - `register(input: RegisterInput!): RegisterPayload!`: хэширует переданный пароль, создает нового пользователя, если такого не существовало и возвращает access token;

- доступные авторизованным пользователям запросы и мутации:

  - `me: User!`: запрос возвращает текущего пользователя;
  - `user(id: Uuid!): User`: запрос возвращает пользователя с переданным id;
  - `users: UserList!`: запрос возвращает список пользователей;
  - `profile(userId: Uuid!): Profile`: запрос возвращает профиль пользователя с переданным userId;
  - `profiles: ProfileList!`: запрос возвращает список профилей;
  - `createProfile(input: CreateProfileInput!): CreateProfilePayload!`: мутация создает профиль для пользователя с переданным userId. Если у пользователя уже существует профиль, то вернется payload c полем status равным `FAIL` и ошибкой `ProfileExistsProblem`;
  - `updateProfile(input: UpdateProfileInput!): UpdateProfilePayload!`: мутация изменяет профиль для пользователя с переданным userId. Если у пользователя нет профиля, то вернется payload c полем status равным `FAIL` и ошибкой `ProfileNotFoundProblem`;
  - `deleteProfile(input: DeleteProfileInput!): DeleteProfilePayload!`: мутация изменяет профиль для пользователя с переданным userId. Если у пользователя нет профиля, то вернется payload c полем status равным `FAIL` и ошибкой `ProfileNotFoundProblem`;

  - добавлены отдельные скаляры для строковых типов `Uuid` и `Email`
  - для всех input и arguments мутаций добавлены проверки валидности данных. Если входные данные некорректны, то будет возвращен payload c полем status равным `FAIL` и ошибкой `ValidationProblem`;
