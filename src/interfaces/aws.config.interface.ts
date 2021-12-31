export default interface IAWSConfiguration {
  profiles: string[]
  profileRegionMap: {[key: string]: string}
}
