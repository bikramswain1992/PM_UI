/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import { SharedSecrets } from '../../SecretsPage/types';
import SecretTabBar from './SecretTabBar';
import SharedSecretTabBar from './SharedSecretTabBar';
import { SecretListProps, barTypeVal } from './types';

const SecretList: React.FC<SecretListProps> = (
  {
    pageLength = 10, secrets, message, showSecret, deleteSecret, barType
  },
) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const updatedTotalPages = Math.floor((secrets?.length ?? 0) / pageLength) === ((secrets?.length ?? 0) / pageLength)
      ? ((secrets?.length ?? 0) / pageLength)
      : (Math.floor((secrets?.length ?? 0) / pageLength) + 1);
    setTotalPages(updatedTotalPages);
  }, [secrets]);

  const pagedSecrets = useMemo(
    () => secrets?.slice(((pageNumber - 1) * pageLength), (pageNumber * pageLength)),
    [pageNumber, secrets],
  );

  const changePage = (num: number) => {
    const updatedPageNumber = pageNumber + num;
    if (updatedPageNumber === 0 || updatedPageNumber > totalPages) {
      return;
    }
    setPageNumber(updatedPageNumber);
  };

  const getBar = () => {
    if (barType === barTypeVal.secretBar) {
      return pagedSecrets?.map((x) => (
        <SecretTabBar
          key={x.id}
          secret={x}
          showSecret={showSecret}
          deleteSecret={deleteSecret}
        />
      ));
    }
    return pagedSecrets?.map((x) => (
      <SharedSecretTabBar
        key={x.id}
        sharedSecret={x as SharedSecrets}
        showSecret={showSecret}
        deleteSecret={deleteSecret}
      />
    ));
  };

  const getPageInfo = () => {
    const startNum = ((pageNumber - 1) * pageLength) + 1;
    const endNum = (pageNumber * pageLength) > (secrets?.length ?? 0)
      ? secrets?.length : (pageNumber * pageLength);
    const total = secrets?.length;
    return `${startNum} - ${endNum} of ${total}`;
  };

  return (
    <div className="secrets-list">
      {
        pagedSecrets && pagedSecrets.length > 0
          ? (
            <>
              <div className="my-secrets-main">
                {
                  getBar()
                }
              </div>
              <div className="page-info">
                <span className="nav-link text-sm" onClick={() => changePage(-1)}>« Prev</span>
                <span className="nav-link text-sm" onClick={() => changePage(1)}>Next »</span>
                <span className="nav-link text-sm">
                  {
                    getPageInfo()
                  }
                </span>
              </div>
            </>
          )
          : (
            <div className="no-secrets-message">
              { message }
            </div>
          )
      }
    </div>
  );
};

export default SecretList;
