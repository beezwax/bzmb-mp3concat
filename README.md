# bzmb-mp3concat

A [bzBond-server](https://github.com/beezwax/bzBond/tree/main/packages/bzBond-server#bzbond-server) microbond to join mp3 files.

## Installation

On a server with bzBond-server installed run the following command:

`/var/www/bzbond-server/bin/install-microbond.sh bzmb-mp3concat beezwax/bzmb-mp3concat`

See the [bzBond-server documentation](https://github.com/beezwax/bzBond/tree/main/packages/bzBond-server#installing-microbonds) for more details on installation.

## Usage

In a server-side FileMaker script run `bzBondRelay` script with parameters in the following format:

```
{
  "mode": "PERFORM_JAVASCRIPT",
  "route": "bzmb-mp3concat",
  "customMethod": "POST",
  "customBody": {
    "files": "array"
    // Example
    "files": ["base64String...", "base64String"]
  }
}

```

The combined mp3 file in base64 format can be accessed via `Get ( ScriptResult )`:
`JSONGetElement ( Get ( ScriptResult ); "response.result" )`