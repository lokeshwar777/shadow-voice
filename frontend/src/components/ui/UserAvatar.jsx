import React from "react";
import { User as UserIcon } from "lucide-react";
import { cn } from "../../lib/utils";

const UserAvatar = ({ user, size = "md", isAnonymous = false }) => {
    const sizeClasses = {
        sm: "w-8 h-8 text-xs",
        md: "w-10 h-10 text-sm",
        lg: "w-16 h-16 text-lg",
    };

    const containerClasses = cn(
        "rounded-full flex items-center justify-center overflow-hidden transition-all duration-300",
        sizeClasses[size],
        isAnonymous ? "bg-secondary text-secondary-foreground" : "bg-primary/10 text-primary"
    );

    if (isAnonymous || !user) {
        return (
            <div className={containerClasses}>
                <UserIcon size={size === "lg" ? 24 : 16} />
            </div>
        );
    }

    // Use the first letter of the name if no image
    const initial = user.name ? user.name.charAt(0).toUpperCase() : "?";

    return user.image ? (
        <div className={containerClasses}>
            <img src={user.image} alt={user.name} className="w-full h-full object-cover" loading="lazy" />
        </div>
    ) : (
        <div className={containerClasses}>{initial}</div>
    );
};

export default UserAvatar;
