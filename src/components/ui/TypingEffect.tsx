import { useState, useEffect, useCallback, memo, useRef } from "react";
import { motion } from "framer-motion";
import styles from "./TypingEffect.module.scss";

interface TypingEffectProps {
  texts: string[];
  inView?: boolean;
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

const TypingEffect = memo(
  ({
    texts,
    inView = true,
    className = "",
    typingSpeed = 100,
    deletingSpeed = 50,
    pauseTime = 2000,
  }: TypingEffectProps) => {
    const [typingText, setTypingText] = useState("");
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const typeText = useCallback(() => {
      if (!inView) return;

      const currentText = texts[currentTextIndex];

      if (isDeleting) {
        // Delete text
        if (typingText.length > 0) {
          timeoutRef.current = setTimeout(() => {
            setTypingText((prev) => prev.slice(0, -1));
          }, deletingSpeed);
        } else {
          // Move to next text when deletion is complete
          timeoutRef.current = setTimeout(() => {
            setCurrentTextIndex((prev) => (prev + 1) % texts.length);
            setIsDeleting(false);
          }, 500);
        }
      } else {
        // Type text
        if (typingText.length < currentText.length) {
          timeoutRef.current = setTimeout(() => {
            setTypingText(currentText.substring(0, typingText.length + 1));
          }, typingSpeed + Math.random() * 50);
        } else {
          // Pause at the end of typing before deleting
          timeoutRef.current = setTimeout(() => {
            setIsDeleting(true);
          }, pauseTime);
        }
      }
    }, [
      typingText,
      currentTextIndex,
      isDeleting,
      inView,
      texts,
      typingSpeed,
      deletingSpeed,
      pauseTime,
    ]);

    useEffect(() => {
      typeText();

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, [typeText]);

    return (
      <motion.div
        className={`${styles.typingText} ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        aria-live="polite"
        aria-atomic="true"
      >
        <span className={styles.prefix}>I am a </span>
        <span className={styles.typingTextContent}>
          {typingText}
          {inView && (
            <motion.span
              className={styles.cursor}
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                repeat: Infinity,
                duration: 0.8,
                repeatType: "reverse",
              }}
            ></motion.span>
          )}
        </span>
      </motion.div>
    );
  }
);

TypingEffect.displayName = "TypingEffect";

export default TypingEffect;
