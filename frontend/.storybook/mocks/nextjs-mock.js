// Моки для Next.js app router API
const useRouter = () => ({
  push: () => {},
  replace: () => {},
  back: () => {},
  forward: () => {},
  refresh: () => {},
  prefetch: () => Promise.resolve(),
})

const usePathname = () => '/workout'

const useSearchParams = () => new URLSearchParams()

module.exports = {
  useRouter,
  usePathname,
  useSearchParams,
}
