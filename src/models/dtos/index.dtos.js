import {
      GetAllDTO,
      SaveUserDTO,
      LoadUserDTO,
      GetUserDTO,
      UpdateDocumentsDTO,
      UpdateRolePremiumDTO,
      UpdateRoleUserDTO,
      UpdateUserDTO,
      DeleteUserDTO,
      LoadAdminDTO,
      CreateResetTokenDTO,
      ResetPasswordDTO
} from "./users/users.dto.js";

import {
      GetProductDTO,
      SaveProductDTO,
} from "./products/products.dto.js";

import {
      GetCartDTO,
      SaveCartDTO,
      DeleteCartDTO,
      AddProductDTO,
      DeleteProductFromCartDTO,
      PurchaseCartDTO
} from "./carts/carts.dto.js";

export const getDTOS = () => ({
      GetAllDTO,
      SaveUserDTO,
      LoadUserDTO,
      GetUserDTO,
      UpdateDocumentsDTO,
      UpdateRolePremiumDTO,
      UpdateRoleUserDTO,
      UpdateUserDTO,
      DeleteUserDTO,
      LoadAdminDTO,
      CreateResetTokenDTO,
      ResetPasswordDTO,
      GetCartDTO,
      SaveCartDTO,
      DeleteCartDTO,
      AddProductDTO,
      DeleteProductFromCartDTO,
      PurchaseCartDTO,
      GetProductDTO,
      SaveProductDTO,
});