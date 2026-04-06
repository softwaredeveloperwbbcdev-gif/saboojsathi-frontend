import AdminAuthenticatedLayout from "@/Components/AdminAuthenticatedLayout";
function Dashboard({ who, stake_cd }) {
  console.log("hehe---" + JSON.stringify(who));
  return (
    <AdminAuthenticatedLayout stake_cd={stake_cd}></AdminAuthenticatedLayout>
  );
}

export default Dashboard;
