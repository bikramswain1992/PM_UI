/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import SecretTabBar from '../../SecretsPage/SecretTabBar';
import { SecretListProps } from './types';

const SecretList: React.FC<SecretListProps> = (
  {
    pageLength = 10, secrets, message, showSecret, deleteSecret,
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
        pagedSecrets
          ? (
            <>
              <div className="my-secrets-main">
                {
                pagedSecrets.map((x) => (
                  <SecretTabBar
                    key={x.id}
                    secret={x}
                    showSecret={showSecret}
                    deleteSecret={deleteSecret}
                  />
                ))
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
