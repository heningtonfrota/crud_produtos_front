import { useUsersStore } from "@/store/users";

export const userHasPermission = (permissionName: string): boolean => {
  const store = useUsersStore();
  
  let hasPermission = false;

  store.me?.permissions.map(permission => {    
    if (permission.name === permissionName) {
      hasPermission = true;
    }
  })

  return hasPermission;
}