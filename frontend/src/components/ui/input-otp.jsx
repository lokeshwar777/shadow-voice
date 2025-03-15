import React, { forwardRef, useContext } from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Dot } from "lucide-react";
import { cn } from "../../lib/utils";

const InputOTP = forwardRef(function InputOTP(
    { className, containerClassName, ...props },
    ref
) {
    return (
        <OTPInput
            ref={ref}
            containerClassName={cn(
                "flex items-center gap-2 has-[:disabled]:opacity-50",
                containerClassName
            )}
            className={cn("disabled:cursor-not-allowed", className)}
            {...props}
        />
    );
});

const InputOTPGroup = forwardRef(function InputOTPGroup(
    { className, ...props },
    ref
) {
    return <div ref={ref} className={cn("flex items-center", className)} {...props} />;
});

const InputOTPSlot = forwardRef(function InputOTPSlot(
    { index, className, ...props },
    ref
) {
    const inputOTPContext = useContext(OTPInputContext);
    const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

    return (
        <div
            ref={ref}
            className={cn(
                "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
                isActive && "z-10 ring-2 ring-ring ring-offset-background",
                className
            )}
            {...props}
        >
            {char}
            {hasFakeCaret && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
                </div>
            )}
        </div>
    );
});

const InputOTPSeparator = forwardRef(function InputOTPSeparator(props, ref) {
    return (
        <div ref={ref} role="separator" {...props}>
            <Dot />
        </div>
    );
});

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
