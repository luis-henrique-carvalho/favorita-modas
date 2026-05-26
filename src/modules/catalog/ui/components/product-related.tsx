import Link from "next/link";
import { formatCurrency } from "@/lib/format";

const RELATED_PRODUCTS = [
  {
    id: "rel-1",
    name: "Sandália Minimal Cream",
    price: 259.0,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB7cntnANA_mzNza6akecI3SZ_iox-3A-rTtArPnPXewN5thlsy_Qn4UdyV2eO-aLPAcvLPaJCHaprNV88PrWCcDFmk9O3Nq-cCWbEJOtAgyexQhkiMspBIyUSqwS1CL2rFzQQo9CyQTZHUHygqwsy3D5Z1j7uQEwtHPscQ02V7T_WRxjkvzIZz8cIS_9KgU7_M63oBuWo7buLtATEjIjKfvSLKgr3RniIzotdfq9xQclieKfI0PMsqK1TQ2rJfF_nVMCy4QGT-7Hk",
    alt: "Luxury minimal cream colored sandals with thin straps on a beige stone surface.",
  },
  {
    id: "rel-2",
    name: "Bolsa Clutch Aurora",
    price: 198.0,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB2epl6zlTkqt2CWamvsMinH9Pxhnq7AOE1rMQNYC5AGoiE1kchlDbkHJEThjJ5zEphsatDnrjvvcQkqGlJH36hqoD6LCZ27Avl95hGH8mVxyjetzMux9Ok1fOXetkaaR1OXiJ3lQ_y_wnt9z0798yPU8nHzs1iiqTjo-RP3FuNgszDkZF9OD0zGgFTIqaxCJFaQ0qiF2jdzyzaKYlIbjZ9GgcfwmiCKD6lO0NbbVNOrQYnRHddZBit12isT0iCr5Zlq4WZpZ8hlj4",
    alt: "A small leather clutch in a muted earthy tone, placed on a white marble table.",
  },
  {
    id: "rel-3",
    name: "Brincos Pérola Lunar",
    price: 87.0,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDx7yPl6XdpEPAf0rqPpYDQimRIXxYjQNI2YDYUzcxFIx2P59WjCyJNkayuJJfXCmhIVddyej0ruri8AjKNgJA91qEkyR-frypiZLxiAV_85YHknvNVVgzv6QUSfPmBOJBLFNNaAD9_Qp7ifJmsXRQB1L_HScvbZePfA3AN4PX69mef67TS9CpzVVR-LXMXDmmEYtcSBv3o0NEX5z1nnapJdAa8UxR_ha-ZqOcd4RiQPxwHKibkN8iuT2oQbyX1kaqvM9BN7KNgdwE",
    alt: "Elegant gold earrings with pearls displayed on a silk jewelry cushion.",
  },
  {
    id: "rel-4",
    name: "Lenço Seda Flora",
    price: 115.0,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB_GH6EUeo-96fjnaFMgbfBfaHUUnK-lIfYDm4iNMvWzrRdGeHBmDr4uiYiilJnOdy4xzvDzyDJNlLFxMJ3OnHruDYJ9-PYWk6X4h774WtNrFZS_S_rUIbmkcitxgDrEVIJjuYo80QA1tivyxMptiGObM9iE9GVyY82gHPdJyHlIoAcK2J_Bbmfj4Ue_Ur6BsNKtPzhK8jbh4QHqosrRADfDIA1S9tMwFmy3Oc864QlQF3f_4vP1w0AtKgXf4KJq4I0obmXxvKwI5M",
    alt: "Sheer silk scarf with a subtle floral print draped over a boutique chair.",
  },
];

export function ProductRelated() {
  return (
    <section className="mt-16 pt-8 border-t border-outline-variant/10">
      <div className="flex justify-between items-end mb-8">
        <div>
          <span className="text-xs text-secondary font-bold uppercase tracking-wider block">
            Combine Com
          </span>
          <h2 className="font-headline text-2xl font-medium text-on-surface">Sugestão de Look</h2>
        </div>
        <Link
          href="/"
          className="text-primary font-bold text-xs border-b border-primary hover:border-transparent pb-0.5 transition-all"
        >
          Ver todos os acessórios
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {RELATED_PRODUCTS.map((item) => (
          <div
            key={item.id}
            className="group cursor-pointer bg-surface-container-lowest p-3 rounded-2xl shadow-soft hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <div className="aspect-3/4 overflow-hidden rounded-xl mb-3 bg-surface-container-low">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.imageUrl}
                alt={item.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
            </div>
            <h3 className="font-body-md text-xs font-medium text-on-surface line-clamp-1 group-hover:text-primary transition-colors">
              {item.name}
            </h3>
            <span className="font-sans text-xs font-bold text-primary mt-1 block">
              {formatCurrency(item.price)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
