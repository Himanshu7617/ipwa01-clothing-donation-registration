import './License.scss';
import licenseInformation from '../assets/license.json';
import packageInformation from '../../package.json';

interface LibraryInformation {
  name: string;
  version: string;
  description: string;
  licenses: string;
  publisher?: string;
  copyright?: string;
  licenseText?: string;
}

interface PackageInformation {
  version: string;
}

function License() {
  const licenses: Record<string, LibraryInformation> = licenseInformation;
  const packageInfo: PackageInformation = packageInformation;

  const libraries: LibraryInformation[] = Object.values(licenses).filter(
    (e) => e.licenses !== 'UNLICENSED',
  );

  return (
    <>
      <h1 className="mt-3">Open Source Assurance</h1>
      <h4 className="fw-bold">Sock Savior v{packageInfo.version}</h4>
      <div>MIT - &copy; Copyright 2023-present Michaela Andermann</div>
      <hr className="hr" />
      <br />
      {libraries.map((e, index) => (
        <div className="library-wrapper" key={index}>
          <h5>
            {e.name} {e.version}
          </h5>{' '}
          <div>
            {e.licenses} - {e.copyright}
          </div>
          <br />
        </div>
      ))}
    </>
  );
}

export default License;
