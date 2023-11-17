import 'react-toastify/dist/ReactToastify.css';
import './app.scss';
import 'app/config/dayjs';

import React, { Profiler, useEffect, useState } from 'react';
import { Card } from 'reactstrap';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSession } from 'app/shared/reducers/authentication';
import { getProfile } from 'app/shared/reducers/application-profile';
import Header from 'app/shared/layout/header/header';
import Footer from 'app/shared/layout/footer/footer';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import ErrorBoundary from 'app/shared/error/error-boundary';
import { AUTHORITIES } from 'app/config/constants';
import AppRoutes from 'app/routes';
import SimulateurPrime from 'app/SimulateurDePrime/SimulateurPrime';
import { Box, ChakraProvider, extendTheme } from '@chakra-ui/react';
import { QueryClientProvider, QueryClient } from 'react-query';

const baseHref = document.querySelector('base').getAttribute('href').replace(/\/$/, '');

const theme = extendTheme({
  styles: {
    global: {},
  },
  textStyles: {
    uCaseInput: {
      textTransform: 'uppercase',
    },
  },

  colors: {
    gray: {
      '50': '#F2F2F2',
      '100': '#DBDBDB',
      '200': '#C4C4C4',
      '300': '#ADADAD',
      '400': '#969696',
      '500': '#808080',
      '600': '#666666',
      '700': '#4D4D4D',
      '800': '#333333',
      '900': '#1A1A1A',
    },
    red: {
      '50': '#FCE8E9',
      '100': '#F7BFC1',
      '200': '#F3969A',
      '300': '#EE6D72',
      '400': '#E9444B',
      '500': '#E41B23',
      '600': '#B6161C',
      '700': '#891015',
      '800': '#5B0B0E',
      '900': '#2E0507',
    },
    blue: {
      '50': '#E5F5FF',
      '100': '#B8E4FF',
      '200': '#8AD2FF',
      '300': '#5CC1FF',
      '400': '#2EAFFF',
      '500': '#009EFF',
      '600': '#007ECC',
      '700': '#005F99',
      '800': '#003F66',
      '900': '#002033',
    },
    orange: {
      '50': '#FDF0E8',
      '100': '#F9D6BE',
      '200': '#F5BC94',
      '300': '#F1A16A',
      '400': '#ED873F',
      '500': '#EA6C15',
      '600': '#BB5711',
      '700': '#8C410D',
      '800': '#5D2B09',
      '900': '#2F1604',
    },
    teal: {
      '50': '#E9FCFC',
      '100': '#C0F6F6',
      '200': '#98F1F1',
      '300': '#6FEBEB',
      '400': '#47E6E6',
      '500': '#1EE1E1',
      '600': '#18B4B4',
      '700': '#128787',
      '800': '#0C5A5A',
      '900': '#062D2D',
    },
    yellow: {
      '50': '#FDF7E7',
      '100': '#FAE9BC',
      '200': '#F7DA91',
      '300': '#F4CC67',
      '400': '#F1BE3C',
      '500': '#EEAF11',
      '600': '#BF8C0D',
      '700': '#8F690A',
      '800': '#5F4607',
      '900': '#302303',
    },
    purple: {
      '50': '#F1EEF6',
      '100': '#D9D0E7',
      '200': '#C0B1D7',
      '300': '#A893C8',
      '400': '#8F75B8',
      '500': '#7656A9',
      '600': '#5F4587',
      '700': '#473465',
      '800': '#2F2343',
      '900': '#181122',
    },
    green: {
      '50': '#F3F8ED',
      '100': '#DDEBCC',
      '200': '#C7DEAB',
      '300': '#B2D18A',
      '400': '#9CC469',
      '500': '#86B748',
      '600': '#6B923A',
      '700': '#506E2B',
      '800': '#36491D',
      '900': '#1B250E',
    },
  },
  components: {
    // App: { margin: '1em' },
    Box: {
      backgroundColor: 'grey.400',
    }, //does nothing
    FormLabel: {
      baseStyle: {
        fontSize: '0.82em',
        marginRight: '0.2em',
        fontWeight: '600',
        height: '1em',
      },
    },
    Input: {
      baseStyle: {
        field: {
          bg: 'white',
          padding: '0.2em',
          height: '1.6em',
          fontSize: '0.7em',
          borderRadius: '0px',
          fontWeight: '600',
        },
      },
    },
    NumberInput: {
      baseStyle: {
        field: {
          bg: 'white',
          padding: '0.2em',
          height: '1.6em',
          fontSize: '0.7em',
          borderRadius: '0px',
          fontWeight: '600',
        },
      },
    },
    Button: {
      //does nothing
      width: '1em',
      height: '0.3em',
    },
    Table: {
      variants: {
        simple: {
          thead: {
            th: {
              paddingLeft: '0.5em',
              paddingRight: '0.3em',
              fontSize: '0.6em',
              color: 'white',
            },
          },
          tbody: {
            td: {
              padding: '0.01em',
            }, //does nothing
            // bg: "red.500",
          },
        },
      },
    },
    Tabs: {
      baseStyle: {
        tab: {
          color: 'red.500',
          height: '1.5em',
          _hover: {
            // bg: "red.600",
          },
          _selected: {
            bg: 'blue.600',
            color: 'white',
            size: 'sm',
          },
        },
      },
    },
    ModalContent: {
      width: '200em',
    },
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSession());
    dispatch(getProfile());
  }, []);

  const currentLocale = useAppSelector(state => state.locale.currentLocale);
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
  const ribbonEnv = useAppSelector(state => state.applicationProfile.ribbonEnv);
  const isInProduction = useAppSelector(state => state.applicationProfile.inProduction);
  const isOpenAPIEnabled = useAppSelector(state => state.applicationProfile.isOpenAPIEnabled);

  const paddingTop = '60px';
  return (
    <BrowserRouter basename={baseHref}>
      <div className="app-container" style={{ paddingTop }}>
        <ToastContainer position={toast.POSITION.TOP_RIGHT} className="toastify-container" toastClassName="toastify-toast" />
        <ErrorBoundary>
          <Header
            isAuthenticated={isAuthenticated}
            isAdmin={isAdmin}
            currentLocale={currentLocale}
            ribbonEnv={ribbonEnv}
            isInProduction={isInProduction}
            isOpenAPIEnabled={isOpenAPIEnabled}
          />
        </ErrorBoundary>
        <div className="container-fluid view-container" id="app-view-container">
          <Card className="jh-card">
            <ErrorBoundary>
              <ChakraProvider
                theme={theme}
                toastOptions={{
                  defaultOptions: {
                    duration: 5000,
                    position: 'top-right',
                    isClosable: true,
                    variant: 'top-accent',
                    size: 'sm',
                  },
                }}
              >
                <QueryClientProvider client={queryClient}>
                  <Box margin="0.5em">
                    <AppRoutes />
                  </Box>
                </QueryClientProvider>
              </ChakraProvider>
            </ErrorBoundary>
          </Card>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
