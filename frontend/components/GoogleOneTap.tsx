"use client";

import Script from "next/script";
import { createClient } from "@/lib/supabase/client";
import type { accounts, CredentialResponse } from "google-one-tap";
import { useRouter } from "next/navigation";
import { useRef } from "react";

declare const google: { accounts: accounts };

function generateNonce(): Promise<[string, string]> {
  const nonce = btoa(
    String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32)))
  );
  const encoder = new TextEncoder();
  const encodedNonce = encoder.encode(nonce);
  return crypto.subtle.digest("SHA-256", encodedNonce).then((hashBuffer) => {
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedNonce = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return [nonce, hashedNonce];
  });
}

interface GoogleOneTapProps {
  /** If set, the official Google sign-in button is rendered into this element (by id). */
  buttonContainerId?: string;
}

export function GoogleOneTap({ buttonContainerId }: GoogleOneTapProps = {}) {
  const supabase = createClient();
  const router = useRouter();
  const initialized = useRef(false);

  const initializeGoogleOneTap = async () => {
    if (initialized.current) return;
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) {
      console.warn("NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set; Google One Tap skipped.");
      return;
    }

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    if (sessionError) {
      console.error("Error getting session", sessionError);
    }
    if (session) {
      router.push("/dashboard");
      return;
    }

    const [nonce, hashedNonce] = await generateNonce();

    google.accounts.id.initialize({
      client_id: clientId,
      callback: async (response: CredentialResponse) => {
        try {
          const { error } = await supabase.auth.signInWithIdToken({
            provider: "google",
            token: response.credential,
            nonce,
          });

          if (error) throw error;

          router.push("/dashboard");
          router.refresh();
        } catch (err) {
          console.error("Error logging in with Google One Tap", err);
        }
      },
      nonce: hashedNonce,
      use_fedcm_for_prompt: true,
    });
    google.accounts.id.prompt();
    if (buttonContainerId) {
      const el = document.getElementById(buttonContainerId);
      if (el) {
        const width = el.offsetWidth || 400;
        google.accounts.id.renderButton(el, {
          type: "standard",
          size: "large",
          text: "continue_with",
          width,
        });
      }
    }
    initialized.current = true;
  };

  return (
    <Script
      src="https://accounts.google.com/gsi/client"
      onLoad={() => {
        initializeGoogleOneTap();
      }}
    />
  );
}
