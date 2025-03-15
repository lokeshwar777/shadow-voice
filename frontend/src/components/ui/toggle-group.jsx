import React, { createContext, useContext, forwardRef } from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cn } from "../../lib/utils";
import { toggleVariants } from "../ui/toggle";

const ToggleGroupContext = createContext({
    size: "default",
    variant: "default",
});

const ToggleGroup = forwardRef((props, ref) => {
    const { className, variant, size, children, ...rest } = props;

    return (
        <ToggleGroupPrimitive.Root
            ref={ref}
            className={cn("flex items-center justify-center gap-1", className)}
            {...rest}
        >
            <ToggleGroupContext.Provider value={{ variant, size }}>
                {children}
            </ToggleGroupContext.Provider>
        </ToggleGroupPrimitive.Root>
    );
});

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = forwardRef((props, ref) => {
    const { className, children, variant, size, ...rest } = props;
    const context = useContext(ToggleGroupContext);

    return (
        <ToggleGroupPrimitive.Item
            ref={ref}
            className={cn(
                toggleVariants({
                    variant: context.variant || variant,
                    size: context.size || size,
                }),
                className
            )}
            {...rest}
        >
            {children}
        </ToggleGroupPrimitive.Item>
    );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
