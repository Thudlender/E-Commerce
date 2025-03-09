import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../contexts/auth.context";
import { useContext } from "react";
//จะใช้คอนเท็กซ์ AuthContext ที่ได้จากไฟล์ auth.context.js ในโฟลเดอร์ contexts และต้องใช้ร่วมกับ useContext จาก react
import CartService from "../services/cart.service";

const useCart = () => {
  const { user } = useContext(AuthContext);
  const { refetch, data: cart = [] } = useQuery({
    //ใช้ queryKey ในการระบุชื่อของ query และใช้ email ของผู้ใช้เป็นค่าที่ใช้ในการ query ข้อมูล
    queryKey: ["carts, user?.email"],
    queryFn: async () => {
      const response = await CartService.getCartItemsByEmail(user?.email);
      return response.data;
    },
  });
  return [cart, refetch];
};

export default useCart;
