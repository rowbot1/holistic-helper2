import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<boolean>(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthClick = async () => {
    if (session) {
      await supabase.auth.signOut();
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="text-2xl font-bold text-tcm-accent">Acu</span>
          <span className="text-tcm-secondary">Assist</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate("/about")}>About</Button>
          <Button variant="ghost" onClick={() => navigate("/how-it-works")}>How It Works</Button>
          <Button variant="ghost" onClick={() => navigate("/privacy-policy")}>Privacy Policy</Button>
          <Button variant="ghost" onClick={() => navigate("/terms-of-service")}>Terms</Button>
          {session ? (
            <>
              <Button variant="ghost" onClick={() => navigate("/patients")}>
                Patients
              </Button>
              <Button 
                className="bg-tcm-primary text-white hover:bg-tcm-primary/90"
                onClick={handleAuthClick}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Button 
              className="bg-tcm-primary text-white hover:bg-tcm-primary/90"
              onClick={handleAuthClick}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
