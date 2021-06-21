module.exports = {
                id: "itemQuery",
                query: `query itemQuery(
  $archetype: ArchetypeInputType!
  $chain: ChainScalar
) {
  archetype(archetype: $archetype) {
    asset {
      ...AssetCardHeader_data
      ...assetInputType
      assetContract {
        account {
          address
          chain {
            identifier
            id
          }
          id
        }
        blockExplorerLink
        id
      }
      assetOwners(first: 1) {
        edges {
          node {
            quantity
            owner {
              ...AccountLink_data
              id
            }
            id
          }
        }
      }
      creator {
        ...AccountLink_data
        id
      }
      animationUrl
      backgroundColor
      collection {
        description
        displayData {
          cardDisplayStyle
        }
        hidden
        imageUrl
        name
        slug
        ...CollectionLink_collection
        ...Boost_collection
        ...Property_collection
        ...NumericTrait_collection
        ...SocialBar_data
        ...verification_data
        id
      }
      decimals
      description
      imageUrl
      numVisitors
      isDelisted
      isListable
      name
      relayId
      tokenId
      hasUnlockableContent
      favoritesCount
      traits(first: 100) {
        edges {
          node {
            relayId
            displayType
            floatValue
            intValue
            traitType
            value
            ...Boost_trait
            ...Property_trait
            ...NumericTrait_trait
            ...Date_trait
            id
          }
        }
      }
      ...AssetMedia_asset
      ...EnsManualEntryModal_asset
      ...Toolbar_asset
      ...asset_url
      ...analyticsV2_item
      ...ChainInfo_data
      id
    }
    ownedQuantity(identity: {})
    ownershipCount
    quantity
    ...TradeStation_archetype_3wquQ2
    ...BidModalContent_archetype_3wquQ2
  }
  tradeSummary(archetype: $archetype) {
    bestAsk {
      closedAt
      orderType
      maker {
        ...wallet_accountKey
        id
      }
      relayId
      id
    }
    ...BidModalContent_trade
    ...TradeStation_data
  }
  account {
    user {
      isStaff
      id
    }
    id
  }
  assetEvents(archetype: $archetype, first: 1) {
    count
  }
}

fragment AccountLink_data on AccountType {
  address
  user {
    publicUsername
    id
  }
  ...ProfileImage_data
  ...wallet_accountKey
  ...accounts_url
}

fragment AskPrice_data on OrderV2Type {
  dutchAuctionFinalPrice
  openedAt
  priceFnEndedAt
  makerAssetBundle {
    assetQuantities(first: 30) {
      edges {
        node {
          ...quantity_data
          id
        }
      }
    }
    id
  }
  takerAssetBundle {
    assetQuantities(first: 1) {
      edges {
        node {
          ...AssetQuantity_data
          id
        }
      }
    }
    id
  }
}

fragment AssetCardHeader_data on AssetType {
  relayId
  favoritesCount
  isDelisted
  isFavorite
}

fragment AssetMedia_asset on AssetType {
  animationUrl
  backgroundColor
  collection {
    description
    displayData {
      cardDisplayStyle
    }
    imageUrl
    hidden
    name
    slug
    id
  }
  description
  name
  tokenId
  imageUrl
  isDelisted
}

fragment AssetQuantity_data on AssetQuantityType {
  asset {
    ...Price_data
    id
  }
  quantity
}

fragment BidModalContent_archetype_3wquQ2 on ArchetypeType {
  asset {
    assetContract {
      account {
        address
        chain {
          identifier
          id
        }
        id
      }
      id
    }
    decimals
    relayId
    collection {
      slug
      paymentAssets(chain: $chain) {
        relayId
        asset {
          assetContract {
            account {
              address
              chain {
                identifier
                id
              }
              id
            }
            id
          }
          decimals
          symbol
          usdSpotPrice
          relayId
          id
        }
        ...PaymentTokenInputV2_data
        id
      }
      ...verification_data
      id
    }
    id
  }
  quantity
  ownedQuantity(identity: {})
}

fragment BidModalContent_trade on TradeSummaryType {
  bestAsk {
    closedAt
    isFulfillable
    oldOrder
    orderType
    relayId
    makerAssetBundle {
      assetQuantities(first: 30) {
        edges {
          node {
            asset {
              collection {
                ...verification_data
                id
              }
              id
            }
            id
          }
        }
      }
      id
    }
    takerAssetBundle {
      assetQuantities(first: 1) {
        edges {
          node {
            quantity
            asset {
              decimals
              relayId
              id
            }
            id
          }
        }
      }
      id
    }
    id
  }
  bestBid {
    relayId
    makerAssetBundle {
      assetQuantities(first: 1) {
        edges {
          node {
            quantity
            asset {
              decimals
              id
            }
            ...AssetQuantity_data
            id
          }
        }
      }
      id
    }
    id
  }
}

fragment Boost_collection on CollectionType {
  numericTraits {
    key
    value {
      max
      min
    }
  }
  slug
}

fragment Boost_trait on TraitType {
  displayType
  floatValue
  intValue
  traitType
}

fragment ChainInfo_data on AssetType {
  assetContract {
    openseaVersion
    account {
      address
      chain {
        identifier
        id
      }
      id
    }
    blockExplorerLink
    id
  }
  isEditableByOwner {
    value
  }
  tokenId
  isFrozen
  frozenAt
  tokenMetadata
}

fragment CollectionLink_collection on CollectionType {
  slug
  name
  ...verification_data
}

fragment Date_trait on TraitType {
  traitType
  floatValue
  intValue
}

fragment EnsManualEntryModal_asset on AssetType {
  assetContract {
    account {
      address
      id
    }
    id
  }
  tokenId
}

fragment NumericTrait_collection on CollectionType {
  numericTraits {
    key
    value {
      max
      min
    }
  }
  slug
}

fragment NumericTrait_trait on TraitType {
  displayType
  floatValue
  intValue
  maxValue
  traitType
}

fragment PaymentAsset_data on PaymentAssetType {
  asset {
    assetContract {
      account {
        chain {
          identifier
          id
        }
        id
      }
      id
    }
    imageUrl
    symbol
    id
  }
}

fragment PaymentTokenInputV2_data on PaymentAssetType {
  relayId
  asset {
    decimals
    symbol
    usdSpotPrice
    id
  }
  ...PaymentAsset_data
}

fragment Price_data on AssetType {
  decimals
  imageUrl
  symbol
  usdSpotPrice
  assetContract {
    blockExplorerLink
    account {
      chain {
        identifier
        id
      }
      id
    }
    id
  }
}

fragment ProfileImage_data on AccountType {
  imageUrl
  address
  chain {
    identifier
    id
  }
}

fragment Property_collection on CollectionType {
  slug
  stats {
    totalSupply
    id
  }
}

fragment Property_trait on TraitType {
  displayType
  traitCount
  traitType
  value
}

fragment SocialBar_data on CollectionType {
  discordUrl
  externalUrl
  instagramUsername
  isEditable
  mediumUsername
  slug
  telegramUrl
  twitterUsername
}

fragment Toolbar_asset on AssetType {
  ...asset_url
  ...analyticsV2_item
  assetContract {
    account {
      address
      chain {
        identifier
        id
      }
      id
    }
    id
  }
  collection {
    externalUrl
    name
    slug
    id
  }
  externalLink
  name
  relayId
  tokenId
}

fragment TradeStation_archetype_3wquQ2 on ArchetypeType {
  ...BidModalContent_archetype_3wquQ2
}

fragment TradeStation_data on TradeSummaryType {
  bestAsk {
    isFulfillable
    closedAt
    dutchAuctionFinalPrice
    openedAt
    orderType
    priceFnEndedAt
    englishAuctionReservePrice
    relayId
    maker {
      ...wallet_accountKey
      id
    }
    makerAssetBundle {
      assetQuantities(first: 30) {
        edges {
          node {
            asset {
              assetContract {
                account {
                  chain {
                    identifier
                    id
                  }
                  id
                }
                id
              }
              collection {
                slug
                id
              }
              id
            }
            ...quantity_data
            id
          }
        }
      }
      id
    }
    taker {
      ...wallet_accountKey
      id
    }
    takerAssetBundle {
      assetQuantities(first: 1) {
        edges {
          node {
            quantity
            asset {
              symbol
              decimals
              relayId
              id
            }
            ...AssetQuantity_data
            id
          }
        }
      }
      id
    }
    ...AskPrice_data
    ...orderLink_data
    ...quantity_remaining
    id
  }
  bestBid {
    makerAssetBundle {
      assetQuantities(first: 1) {
        edges {
          node {
            quantity
            ...AssetQuantity_data
            id
          }
        }
      }
      id
    }
    id
  }
  ...BidModalContent_trade
}

fragment accounts_url on AccountType {
  address
  chain {
    identifier
    id
  }
  user {
    publicUsername
    id
  }
}

fragment analyticsV2_item on AssetType {
  assetContract {
    account {
      address
      chain {
        identifier
        id
      }
      id
    }
    id
  }
  tokenId
}

fragment assetInputType on AssetType {
  tokenId
  assetContract {
    account {
      address
      chain {
        identifier
        id
      }
      id
    }
    id
  }
}

fragment asset_url on AssetType {
  assetContract {
    account {
      address
      chain {
        identifier
        id
      }
      id
    }
    id
  }
  tokenId
}

fragment orderLink_data on OrderV2Type {
  makerAssetBundle {
    assetQuantities(first: 30) {
      edges {
        node {
          asset {
            externalLink
            collection {
              externalUrl
              id
            }
            id
          }
          id
        }
      }
    }
    id
  }
}

fragment quantity_data on AssetQuantityType {
  asset {
    decimals
    id
  }
  quantity
}

fragment quantity_remaining on OrderV2Type {
  quantity_remaining_makerAssetBundle: makerAssetBundle {
    assetQuantities(first: 1) {
      edges {
        node {
          asset {
            decimals
            id
          }
          quantity
          id
        }
      }
    }
    id
  }
  quantity_remaining_takerAssetBundle: takerAssetBundle {
    assetQuantities(first: 1) {
      edges {
        node {
          asset {
            decimals
            id
          }
          quantity
          id
        }
      }
    }
    id
  }
  remainingQuantity
  side
}

fragment verification_data on CollectionType {
  isMintable
  isSafelisted
  isVerified
}

fragment wallet_accountKey on AccountType {
  address
  chain {
    identifier
    id
  }
}`
                ,
                variables: {
                    "archetype": {
                        "assetContractAddress": "0x",
                        "tokenId": "1",
                        "chain": "MATIC"
                    },
                    "chain": "MATIC"
                }
            }
