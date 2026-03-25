import svgPaths from "./svg-jav4lrczhv";

function GrandTourSochi() {
  return (
    <div className="absolute inset-[85.87%_6.98%_3.62%_9.88%]" data-name="Grand Tour Sochi">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1261.99 65.2792">
        <g id="Grand Tour Sochi">
          <path d={svgPaths.p26f98980} fill="var(--fill-0, #BE0607)" id="Vector" />
          <path d={svgPaths.pf614400} fill="var(--fill-0, #BE0607)" id="Vector_2" />
          <path d={svgPaths.pab0e7c0} fill="var(--fill-0, #BE0607)" id="Vector_3" />
          <path d={svgPaths.p103e2500} fill="var(--fill-0, #BE0607)" id="Vector_4" />
          <path d={svgPaths.p36467cc0} fill="var(--fill-0, #BE0607)" id="Vector_5" />
          <path d={svgPaths.pb5e1180} fill="var(--fill-0, white)" id="Vector_6" />
          <path d={svgPaths.p24259a0} fill="var(--fill-0, white)" id="Vector_7" />
          <path d={svgPaths.p3b93c530} fill="var(--fill-0, white)" id="Vector_8" />
          <path d={svgPaths.p19bdff40} fill="var(--fill-0, white)" id="Vector_9" />
          <path d={svgPaths.p13676000} fill="var(--fill-0, white)" id="Vector_10" />
          <path d={svgPaths.p61cc900} fill="var(--fill-0, white)" id="Vector_11" />
          <path d={svgPaths.pa460700} fill="var(--fill-0, white)" id="Vector_12" />
          <path d={svgPaths.p1ef2f900} fill="var(--fill-0, white)" id="Vector_13" />
          <path d={svgPaths.p1c6c5980} fill="var(--fill-0, white)" id="Vector_14" />
        </g>
      </svg>
    </div>
  );
}

function Gts() {
  return (
    <div className="absolute inset-[15.32%_6.25%_31.04%_9.08%]" data-name="GTS">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1285.33 333.133">
        <g id="GTS">
          <path d={svgPaths.p4621680} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p29914e30} fill="var(--fill-0, #BE0607)" id="Vector_2" />
          <path d={svgPaths.p358fb820} fill="var(--fill-0, #BE0607)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[15.32%_6.25%_3.62%_9.08%]">
      <GrandTourSochi />
      <Gts />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-[15.32%_6.25%_3.62%_9.08%]">
      <Group />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="relative size-full" style={{ backgroundImage: "linear-gradient(179.154deg, rgba(0, 20, 30, 0) 1.7861%, rgba(0, 23, 36, 0) 18.227%, rgba(0, 34, 48, 0) 32.842%, rgba(0, 37, 53, 0) 44.005%)" }}>
      <Group1 />
    </div>
  );
}