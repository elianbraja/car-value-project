import { Module, UseInterceptors } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { AuthService } from "./auth.service";
import { CurrentUserInterceptor } from "./interceptors/current-user.interceptors";
import { APP_INTERCEPTOR } from "@nestjs/core";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService,
    AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor
    }
  ]
})
export class UsersModule {
}

// with the help of this the controller will execute all interceptors before everything else.
// We need this because we have the user interceptor that we want to be executed before the
// current user decorator. That on top is a global interceptor that can be used in different controllers.
// You should be aware that this is applied everywhere, even in controllers that may not use current user
