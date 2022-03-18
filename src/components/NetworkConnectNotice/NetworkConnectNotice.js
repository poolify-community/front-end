import React, { useCallback, useMemo, useState } from 'react';
import { networkSettings, networkSetup } from 'libs/helpers/networkSetup';
import { getNetworkAppUrl, getNetworkFriendlyName } from 'libs/helpers/getNetworkData';
import { useTranslation } from 'react-i18next';
import {
  Button
} from "@chakra-ui/react";

const targetNetworkId = window.REACT_APP_NETWORK_ID;

const styles = {
  notice: {
    backgroundColor: 'rgba(166, 189, 203, 0.42)',
    padding: 25,
    marginBottom: 25,
    marginTop:15,
    textAlign: 'center',
    color: '',
    '& > :lastChild': {
      marginBottom: 0,
    },
  },
  message: {
    marginBottom: 15,
  },
  actions: {
    margin: '-10px -10px 15px 0',
  },
  button: {
    border: '1px solid #3a83c1',
    padding: '4px 8px',
    backgroundColor: '#3a83c1',
    textTransform: 'none',
    margin: '10px 10px 0 0',
  },
  note: {
    marginBottom: 15,
    fontStyle: 'italic',
  },
  error: {
    color: 'red',
  },
};

export function NetworkConnectNotice({
  web3,
  address,
  networkId,
  connectWallet,
  disconnectWallet,
}) {
  const [networkSetupError, setNetworkSetupError] = useState(null);
  const { t } = useTranslation();
  const haveConnection = !!web3;
  const haveAddress = !!address;
  const isCorrectNetwork = networkId === targetNetworkId;
  const isSupportedNetwork = networkId && networkId in networkSettings;
  const targetNetworkFriendlyName = getNetworkFriendlyName();
  let notice = null;

  const targetNetworkSetup = useCallback(() => {
    setNetworkSetupError(null);

    networkSetup(targetNetworkId)
      .then(() => {
        setNetworkSetupError(null);
      })
      .catch(e => {
        if (typeof e === 'object' && typeof e.message === 'string') {
          setNetworkSetupError(e.message);
        } else if (typeof e === 'string') {
          setNetworkSetupError(e);
        } else {
          setNetworkSetupError(t('Network-UnknownError'));
        }
      });
  }, [setNetworkSetupError, t]);

  const networkRedirect = url => {
    window.location.assign(url);
    window.location.reload();
  };

  const supportedNetwork = useMemo(() => {
    return isSupportedNetwork
      ? {
          id: networkId,
          url: getNetworkAppUrl(networkId),
          name: getNetworkFriendlyName(networkId),
        }
      : null;
  }, [isSupportedNetwork, networkId]);

  if (!haveConnection) {
    notice = (
      <>
        <div style={styles.message}>
          {t('Network-ConnectionRequired', { network: targetNetworkFriendlyName })}
        </div>
        <div style={styles.actions}>
          <Button onClick={connectWallet} style={styles.button}>
            {t('Network-ConnectWallet')}
          </Button>
        </div>
      </>
    );
  } else if (!isCorrectNetwork) {
    notice = (
      <>
        <div style={styles.message}>
          {t('Network-Supports', { network: targetNetworkFriendlyName })}{' '}
          {isSupportedNetwork
            ? t('Network-ConnectedTo', { network: supportedNetwork.name })
            : t('Network-ConnectedUnsupported')}
        </div>
        <div style={styles.actions}>
          <Button onClick={targetNetworkSetup} style={styles.button}>
            {t('Network-SwitchToNetwork', { network: targetNetworkFriendlyName })}
          </Button>
          {isSupportedNetwork ? (
            <Button
              onClick={() => networkRedirect(supportedNetwork.url)}
              style={styles.button}
            >
              {t('Network-GoToApp', { network: supportedNetwork.name })}
            </Button>
          ) : null}
          <Button onClick={disconnectWallet} style={styles.button}>
            {t('Network-DisconnectWallet')}
          </Button>
        </div>
        <div style={styles.note}>{t('Network-SwitchNote')}</div>
        {networkSetupError ? <div style={styles.error}>{networkSetupError}</div> : ''}
      </>
    );
  } else if (!haveAddress) {
    notice = (
      <>
        <div style={styles.message}>
          {t('Network-ConnectedTo', { network: targetNetworkFriendlyName })}
        </div>
        <div style={styles.error}>{t('Network-NoWalletAddress')}</div>
      </>
    );
  }

  return notice ? <div style={styles.notice}>{notice}</div> : null;
}
