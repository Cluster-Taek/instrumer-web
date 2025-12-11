'use client';

import { MOTION } from '@/constants/motion-constants';
import { cn } from '@/lib/utils';
import { CheckCircleSolid, ExclamationCircleSolid, InformationCircleSolid } from '@medusajs/icons';
import { AnimatePresence, motion } from 'framer-motion';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

interface IAlert {
  variant?: 'error' | 'success' | 'warning' | 'info';
  children: React.ReactNode;
}

interface IAlertContextType {
  alert: (alert: IAlert) => void;
}

interface IAlertContextProps {
  children: React.ReactNode;
}

export const AlertContext = createContext<IAlertContextType>({} as IAlertContextType);

const AlertProvider: React.FC<IAlertContextProps> = ({ children }) => {
  const [openedAlerts, setOpenedAlerts] = useState<IAlert[]>([]);

  const alert = useCallback(
    ({ children, variant = 'info' }: IAlert) => {
      setOpenedAlerts((prev) => [...prev, { children, variant }]);
    },
    [setOpenedAlerts]
  );

  useEffect(() => {
    if (openedAlerts.length > 3) {
      setOpenedAlerts((prev) => prev.slice(1));
    }

    if (openedAlerts.length > 0) {
      const timeout = setTimeout(() => {
        setOpenedAlerts((prev) => prev.slice(1));
      }, 2500);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [openedAlerts]);

  const AlertIcon = ({ variant = 'info' }: { variant?: 'error' | 'success' | 'warning' | 'info' }) => {
    return (
      <div
        className={cn('text-ui-tag-red-icon', {
          'text-ui-tag-green-icon': variant === 'success',
          'text-ui-tag-orange-icon': variant === 'warning',
          'text-ui-tag-neutral-icon': variant === 'info',
        })}
      >
        {variant === 'error' && <ExclamationCircleSolid />}
        {variant === 'success' && <CheckCircleSolid />}
        {variant === 'warning' && <ExclamationCircleSolid />}
        {variant === 'info' && <InformationCircleSolid />}
      </div>
    );
  };

  const AlertContainer = () => {
    return (
      <div className="fixed z-50 flex flex-col items-center justify-center gap-1 transform -translate-x-1/2 bottom-5 left-1/2">
        <AnimatePresence>
          {openedAlerts.map((alert, index) => (
            <motion.div key={index} {...MOTION.POP}>
              <div className="flex flex-row bg-ui-bg-subtle text-pretty text-gray-300 txt-compact-small justify-start items-center gap-x-2 rounded-lg border p-3 grid-cols-[20px_1fr]">
                <AlertIcon variant={alert.variant ?? 'info'} />
                <div>{alert.children}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <AlertContext.Provider
      value={{
        alert,
      }}
    >
      {children}
      <AlertContainer />
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const { alert } = useContext(AlertContext);

  return { alert };
};

export default AlertProvider;
