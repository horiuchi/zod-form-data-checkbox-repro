import { Form, useActionData, useNavigation } from "react-router";
import type { ActionFunctionArgs } from "react-router";
import { zfd } from "zod-form-data";

const checkboxSchema = zfd.formData({
  accepted: zfd.checkbox(),
});

type ActionResult =
  | {
      ok: true;
      rawEntries: Record<string, string>;
      parsed: {
        accepted: boolean;
      };
    }
  | {
      ok: false;
      rawEntries: Record<string, string>;
      issues: Array<{
        path: string;
        message: string;
      }>;
    };

export async function checkboxAction({
  request,
}: ActionFunctionArgs): Promise<ActionResult> {
  const formData = await request.formData();
  const rawEntries = getRawEntries(formData);
  const parsed = checkboxSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      ok: false,
      rawEntries,
      issues: parsed.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    };
  }

  return {
    ok: true,
    rawEntries,
    parsed: parsed.data,
  };
}

export function CheckboxRepro() {
  const actionData = useActionData() as ActionResult | undefined;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <main className="shell">
      <section className="panel">
        <div className="heading">
          <p className="eyebrow">zod-form-data</p>
          <h1>zfd.checkbox() repro</h1>
        </div>

        <Form method="post" className="form">
          <label className="checkboxRow" htmlFor="accepted">
            <input id="accepted" name="accepted" type="checkbox" />
            <span>accepted</span>
          </label>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </Form>
      </section>

      <section className="results" aria-live="polite">
        <ResultBlock
          title="Raw FormData entries"
          value={actionData?.rawEntries ?? null}
        />
        <ResultBlock
          title="zfd.checkbox() parse result"
          value={
            actionData
              ? actionData.ok
                ? actionData.parsed
                : { issues: actionData.issues }
              : null
          }
        />
      </section>
    </main>
  );
}

function ResultBlock({ title, value }: { title: string; value: unknown }) {
  return (
    <div className="resultBlock">
      <h2>{title}</h2>
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </div>
  );
}

function getRawEntries(formData: FormData) {
  return Object.fromEntries(
    Array.from(formData.entries(), ([key, value]) => [
      key,
      value instanceof File ? value.name : value,
    ]),
  );
}
