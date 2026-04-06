import { useState } from "react";
import { Outlet } from "react-router";


function Layout(){
    const [role, setRole] = useState<'viewer' | 'admin'>('viewer');

    // const toggleRole = () => setRole(role === 'viewer' ? 'admin' : 'viewer');

    return (
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <DashboardLayout currentRole={role} onRoleChange={setRole}>
                <Outlet />
            </DashboardLayout>
            
        </ThemeProvider>
    )
}