export const canViewAllProducts = (user: any): boolean => {
  if (!user) return false;
  if (user.is_super_admin) return true;
  return !!(user.role && user.role.product && user.role.product.view);
};
