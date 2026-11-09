import {
  Alert,
  Avatar,
  Badge,
  Button,
  Checkbox,
  DropdownMenu,
  Input,
  Progress,
  PravaProvider,
  RadioGroup,
  Select,
  Switch,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Tooltip,
  toast,
} from "prava-ui";
import { useState, type ReactNode } from "react";
import { DotsIcon } from "../ui/icons";

const en = {
  profile: "Profile",
  notifications: "Notifications",
  billing: "Billing",
  team: "Team",
  general: "General",
  plan: "Plan",
  name: "Full name",
  email: "Work email",
  zone: "Time zone",
  mention: "Email me when someone mentions me",
  save: "Save changes",
  cancel: "Cancel",
  saved: "Saved",
  savedBody: "Your profile is up to date.",
  comments: "Comments on my work",
  updates: "Product updates",
  digest: "Weekly digest",
  cycle: "Billing cycle",
  monthly: "Monthly",
  yearly: "Yearly, 2 months free",
  storage: "Storage used",
  more: "More options",
  export: "Export data",
  signOut: "Sign out everywhere",
  remove: "Delete account",
  pro: "Pro",
};
const ar: typeof en = {
  profile: "الملف الشخصي",
  notifications: "الإشعارات",
  billing: "الفوترة",
  team: "الفريق",
  general: "عام",
  plan: "الخطة",
  name: "الاسم الكامل",
  email: "بريد العمل",
  zone: "المنطقة الزمنية",
  mention: "راسلني عندما يذكرني أحد",
  save: "حفظ التغييرات",
  cancel: "إلغاء",
  saved: "تم الحفظ",
  savedBody: "ملفك الشخصي محدّث.",
  comments: "التعليقات على عملي",
  updates: "تحديثات المنتج",
  digest: "ملخص أسبوعي",
  cycle: "دورة الفوترة",
  monthly: "شهري",
  yearly: "سنوي، شهران مجانًا",
  storage: "المساحة المستخدمة",
  more: "خيارات إضافية",
  export: "تصدير البيانات",
  signOut: "تسجيل الخروج من كل مكان",
  remove: "حذف الحساب",
  pro: "احترافي",
};

/** Wraps one part of the specimen so hovering it names the component and links to its page. */
function Part({ name, slug, children, block, end }: { name: string; slug: string; children: ReactNode; block?: boolean; end?: boolean }) {
  return (
    <div className={`part${block ? " part--block" : ""}${end ? " part--end" : ""}`}>
      {children}
      <a className="part__tag" href={`#/${slug}`} dir="ltr" tabIndex={-1}>
        {name}
      </a>
    </div>
  );
}

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="seg" role="group" aria-label={label}>
      {options.map((o) => (
        <button key={o.value} type="button" aria-pressed={value === o.value} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Specimen() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");
  const [names, setNames] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [section, setSection] = useState("profile");
  const t = dir === "rtl" ? ar : en;

  const save = () => {
    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      setSaved(true);
      toast({ title: t.saved, description: t.savedBody, tone: "success" });
    }, 900);
  };

  return (
    <figure className="specimen" aria-label="Live specimen: an account settings screen built from Prava UI">
      <figcaption className="specimen__bar">
        <span className="specimen__live">
          <span className="pulse" aria-hidden="true" />
          Live specimen
        </span>
        <div className="specimen__controls">
          <Segmented
            label="Specimen theme"
            value={theme}
            onChange={setTheme}
            options={[
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
            ]}
          />
          <Segmented
            label="Specimen direction"
            value={dir}
            onChange={setDir}
            options={[
              { value: "ltr", label: "LTR" },
              { value: "rtl", label: "RTL" },
            ]}
          />
          <Switch label="Name parts" checked={names} onChange={(e) => setNames(e.target.checked)} />
        </div>
      </figcaption>

      <PravaProvider theme={theme} direction={dir} locale={dir === "rtl" ? "ar" : "en"}>
        <div className={`specimen__app${names ? " show-names" : ""}`} onChange={() => setSaved(false)}>
          <nav className="sp-nav" aria-label="Settings sections">
            <Part name="Badge + Avatar" slug="badge">
              <div className="sp-user">
                <Badge content="2" tone="danger" placement="top-end">
                  <Avatar firstName="Asha" lastName="Rao" />
                </Badge>
                <div>
                  <strong>Asha Rao</strong>
                  <Badge content={t.pro} tone="primary" size="sm" />
                </div>
              </div>
            </Part>
            {(["profile", "notifications", "billing", "team"] as const).map((s) => (
              <button
                key={s}
                type="button"
                className="sp-nav__item"
                aria-current={section === s ? "page" : undefined}
                onClick={() => setSection(s)}
              >
                {t[s]}
              </button>
            ))}
          </nav>

          <div className="sp-pane">
            <div className="sp-pane__head">
              <h3>{t.profile}</h3>
              <Part name="DropdownMenu" slug="dropdown-menu" end>
                <Tooltip content={t.more}>
                  <DropdownMenu
                    trigger={
                      <Button variant="ghost" type="icon" aria-label={t.more} size="sm">
                        <DotsIcon />
                      </Button>
                    }
                    items={[
                      { label: t.export, onSelect: () => toast({ title: t.export }) },
                      { label: t.signOut, onSelect: () => toast({ title: t.signOut }) },
                      { separator: true },
                      { label: t.remove, tone: "danger", onSelect: () => toast({ title: t.remove, tone: "danger" }) },
                    ]}
                  />
                </Tooltip>
              </Part>
            </div>

            <Part name="Tabs" slug="tabs" block>
              <Tabs defaultValue="general">
                <TabList aria-label={t.profile}>
                  <Tab value="general">{t.general}</Tab>
                  <Tab value="notifications">{t.notifications}</Tab>
                  <Tab value="plan">{t.plan}</Tab>
                </TabList>

                <TabPanel value="general">
                  <div className="sp-form">
                    <div className="sp-row">
                      <Part name="Input" slug="input" block>
                        <Input label={t.name} defaultValue="Asha Rao" />
                      </Part>
                      <Part name="Input" slug="input" block>
                        <Input label={t.email} type="email" defaultValue="asha@example.com" required />
                      </Part>
                    </div>
                    <Part name="Select" slug="select" block>
                      <Select
                        label={t.zone}
                        defaultValue="kolkata"
                        searchable
                        onValueChange={() => setSaved(false)}
                        options={[
                          { value: "kolkata", label: "Asia/Kolkata (UTC+5:30)" },
                          { value: "dubai", label: "Asia/Dubai (UTC+4)" },
                          { value: "london", label: "Europe/London (UTC+0)" },
                          { value: "ny", label: "America/New_York (UTC−5)" },
                        ]}
                      />
                    </Part>
                    <Part name="Switch" slug="switch">
                      <Switch label={t.mention} defaultChecked />
                    </Part>
                  </div>
                </TabPanel>

                <TabPanel value="notifications">
                  <div className="sp-form">
                    <Part name="Checkbox" slug="checkbox" block>
                      <div className="sp-stack">
                        <Checkbox label={t.comments} defaultChecked />
                        <Checkbox label={t.updates} />
                        <Checkbox label={t.digest} defaultChecked />
                      </div>
                    </Part>
                  </div>
                </TabPanel>

                <TabPanel value="plan">
                  <div className="sp-form">
                    <Part name="RadioGroup" slug="radio-group" block>
                      <RadioGroup
                        label={t.cycle}
                        defaultValue="yearly"
                        options={[
                          { value: "monthly", label: t.monthly },
                          { value: "yearly", label: t.yearly },
                        ]}
                      />
                    </Part>
                    <Part name="Progress" slug="progress" block>
                      <Progress label={t.storage} value={64} showValue />
                    </Part>
                  </div>
                </TabPanel>
              </Tabs>
            </Part>

            {saved && (
              <Part name="Alert" slug="alert" block>
                <Alert tone="success" title={t.saved}>
                  {t.savedBody}
                </Alert>
              </Part>
            )}

            <div className="sp-actions">
              <Part name="Button" slug="button">
                <Button loading={saving} onClick={save}>
                  {t.save}
                </Button>
              </Part>
              <Button variant="outline" onClick={() => setSaved(false)}>
                {t.cancel}
              </Button>
            </div>
          </div>
        </div>
      </PravaProvider>
    </figure>
  );
}
