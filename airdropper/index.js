const axios = require('axios');

(async () => {


    let ERC1155Tokens = [
        "0xe4605d46fd0b3f8329d936a8b258d69276cba264", // Meme
        "0x7cdc0421469398e0f3aa8890693d86c840ac8931", // Doki
    ];

    /* get All holders for all ERC1155 tokens */
    for (const add of ERC1155Tokens) {
        let addresses = {};

        let skip = 0;
        let shouldContinue = true;

        while (shouldContinue) {


            let holder = await axios.post('https://api.thegraph.com/subgraphs/name/tofuhua/prodethsubgraph', {
                query: `
            {
        nft1155Owners(first: 1000, skip: ` + skip + `, where: {nftAddress: "` + add + `"}) {
            owner
            tokenId
            count
          }
         }
        `
            })
            console.log(holder.data)
            for (const owner of holder.data.data.nft1155Owners) {
                addresses[owner.owner] = true;
            }
            skip += 1000;
            console.log(holder.data.data.nft1155Owners.length)
            if (holder.data.data.nft1155Owners.length != 1000 || skip == 6000) {
                shouldContinue = false
            }
        }
        console.log(add, " has ", Object.keys(addresses).length)
        //console.log(addresses)
    }

})();


/* Dune query to get all wallets that once got those

SELECT * FROM (SELECT "to" FROM erc1155."ERC1155_evt_TransferBatch" WHERE contract_address IN ('\xe4605d46fd0b3f8329d936a8b258d69276cba264', '\x7cdc0421469398e0f3aa8890693d86c840ac8931', '\x7c40c393dc0f283f318791d746d894ddd3693572', '\xc2c747e0f7004f9e8817db2ca4997657a7746928', '\x892555e75350e11f2058d086c72b9c94c9493d72', '\x1db61fc42a843bad4d91a2d788789ea4055b8613') 
UNION ALL
SELECT "to" FROM erc1155."ERC1155_evt_TransferSingle" WHERE contract_address IN ('\xe4605d46fd0b3f8329d936a8b258d69276cba264', '\x7cdc0421469398e0f3aa8890693d86c840ac8931', '\x7c40c393dc0f283f318791d746d894ddd3693572', '\xc2c747e0f7004f9e8817db2ca4997657a7746928', '\x892555e75350e11f2058d086c72b9c94c9493d72', '\x1db61fc42a843bad4d91a2d788789ea4055b8613')
UNION ALL
SELECT "to" FROM erc721."ERC721_evt_Transfer" WHERE contract_address IN ('\xe4605d46fd0b3f8329d936a8b258d69276cba264', '\x7cdc0421469398e0f3aa8890693d86c840ac8931', '\x7c40c393dc0f283f318791d746d894ddd3693572', '\xc2c747e0f7004f9e8817db2ca4997657a7746928', '\x892555e75350e11f2058d086c72b9c94c9493d72', '\x1db61fc42a843bad4d91a2d788789ea4055b8613')
)AS all_add
GROUP BY "to"

*/

/* 


WITH token_contract_address(addr) AS (
    VALUES (  '\xb6ca7399b4f9ca56fc27cbff44f4d2e4eef1fc81'  )), -- Muse

tokenTransfers AS (
    SELECT
    evt_tx_hash AS tx_hash,
    tr."from" AS address,
    -(tr.value/1e18) AS amount,
    date_trunc('day', tr.evt_block_time) AS time,
    contract_address 
     FROM erc20."ERC20_evt_Transfer" tr
     WHERE contract_address = (SELECT addr::bytea FROM token_contract_address)
UNION ALL
    SELECT
    evt_tx_hash AS tx_hash,
    tr."to" AS address,
    (tr.value/1e18) AS amount,
    date_trunc('day', tr.evt_block_time) AS time,
      contract_address
     FROM erc20."ERC20_evt_Transfer" tr 
     where contract_address = (SELECT addr::bytea FROM token_contract_address)
),
tokenBalances AS (
SELECT time, address, SUM(diff) OVER (PARTITION BY address ORDER BY time) AS balance
FROM (
    SELECT time, address, SUM(amount) AS diff
    FROM tokenTransfers
    WHERE (address <> '\x0000000000000000000000000000000000000000')
    GROUP BY 1, 2
    ORDER BY time ) AS diffs
)
SELECT *
FROM tokenBalances
WHERE (time = "11/04/21 00:00")
--ORDER BY balance DESC
ORDER BY time DESC
LIMIT 10000

*/