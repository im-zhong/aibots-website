import { redirect } from "next/navigation";

export default function Home() {
  // 主页这里直接一个redirect
  // 但是我们在其他所有的页面都加上一个auth guard
  // 用于验证用户登录，如果用户登录了，就可以正常的访问那些页面
  // 如果没有，那么authguard会把我们回退到主页 或者登录页面
  // 这样就完成了自动登录
  redirect("/agent");
}
