<!--
  content/reading/reading.md
  Single source of truth for the /reading page (src/app/reading/page.tsx).

  STRUCTURE
  This file is not standard MDX/frontmatter. It is a flat, line-based format
  parsed by getReadingCategories() in src/lib/content.ts:

    ## Category: <name>
    Description: <one factual sentence>

    ### Book: <title>
    Hero: true | false
    Author: <verified author string>
    Year: <first-publication year, verified, not guessed>
    CoverUrl: <front-cover image URL, ISBN-matched via covers.openlibrary.org
               so it's the correct edition, not a fuzzy title search. A
               couple of books use an olid-matched URL
               (covers.openlibrary.org/b/olid/<edition-id>-L.jpg) instead --
               same verified edition, but a brighter/cleaner scan than the
               one that ISBN resolves to by default>
    Tags: <2-4 comma-separated tags, drawn only from the controlled
           vocabulary listed below -- do not introduce a new tag without
           adding it to that list and to the color mapping in
           src/app/reading/tags.ts>
    Summary: <one sentence, what the book is>
    Detail: <one paragraph, up to 4 further sentences: the core argument
             and what the book covers>
    AmazonUrl: <leave blank>

  Each field is a single physical line (Summary/Detail are written as one
  long line each, not wrapped) so the parser can read them with a plain
  line scan. Exactly 5 categories, 4 books each, one book per category
  marked Hero: true.

  AMAZON LINKS
  Every AmazonUrl below is intentionally blank. The page renders each
  book's "View on Amazon" button as present but inert (no href, aria-
  disabled, data-affiliate-pending) whenever its AmazonUrl is empty. To
  activate a link, fill in the real (affiliate) URL on that book's
  AmazonUrl line and nothing else -- this file is the only place that
  needs editing.

  TAG VOCABULARY (controlled -- reuse these exact strings only)
  Design Research, Design Thinking, Strategy, Innovation, Systems,
  Service Design, Ideation, Prototyping, Business Model, Leadership,
  Creativity, Methods
-->

## Category: Making the Case
Description: Books on why curiosity, purpose, and a willingness to be wrong come before any method.

### Book: Change by Design
Hero: true
Author: Tim Brown (with Barry Katz)
Year: 2009
CoverUrl: https://covers.openlibrary.org/b/isbn/9780061766084-L.jpg
Tags: Design Thinking, Innovation, Methods
Summary: Change by Design is a book by IDEO's CEO Tim Brown that introduces design thinking as an approach to innovation and organizational problem-solving.
Detail: The book argues that designers' methods, moving between observation, ideation, and prototyping rather than following a single linear process, can be applied beyond product design to strategy, services, and social problems. Brown describes a three-space model of inspiration, ideation, and implementation, and uses IDEO project examples to show how cross-disciplinary teams generate and test ideas early. He contrasts design thinking with conventional, analysis-driven business planning, arguing that early prototyping surfaces problems that spreadsheets cannot. The book positions design as a way of framing problems, not only styling solutions.
AmazonUrl:

### Book: A More Beautiful Question
Hero: false
Author: Warren Berger
Year: 2014
CoverUrl: https://covers.openlibrary.org/b/isbn/9781632861054-L.jpg
Tags: Innovation, Creativity, Design Thinking
Summary: A More Beautiful Question is a book by journalist Warren Berger about the role of questioning in innovation and problem-solving.
Detail: Berger argues that new ideas usually begin with a well-formed question rather than a ready answer, and organizes the book around a three-stage sequence he calls why, what if, and how. Drawing on interviews with entrepreneurs, designers, and educators, he examines why schools and workplaces tend to reward answers over inquiry as people get older. The book treats questioning as a skill that can be practiced, offering techniques for reframing a problem before attempting to solve it. It illustrates the approach with cases in which a reframed question preceded a change in product or business direction.
AmazonUrl:

### Book: Start with Why
Hero: false
Author: Simon Sinek
Year: 2009
CoverUrl: https://covers.openlibrary.org/b/isbn/9781591842804-L.jpg
Tags: Leadership, Strategy
Summary: Start with Why is a book by Simon Sinek that proposes a model for how leaders and organizations communicate and inspire action.
Detail: Sinek presents the "Golden Circle," a three-layer model of why, how, and what, and argues that most organizations communicate from the outside in, starting with what they do, while a smaller group of leaders start with why they do it. He draws on decision-making research and cites Apple, the Wright brothers, and Martin Luther King Jr. as examples of leaders or organizations that led with purpose before product. The book argues that a clearly stated purpose builds loyalty among employees and customers in a way that features or price alone cannot. It offers a framework for individuals and organizations to define and communicate their own why.
AmazonUrl:

### Book: Think Again
Hero: false
Author: Adam Grant
Year: 2021
CoverUrl: https://covers.openlibrary.org/b/isbn/9781984878106-L.jpg
Tags: Leadership, Creativity
Summary: Think Again is a book by organizational psychologist Adam Grant about the value of rethinking one's own opinions and decisions.
Detail: Grant argues that people default to three mindsets when defending a belief, preacher, prosecutor, and politician, and proposes a fourth, the scientist, who treats opinions as hypotheses to be tested rather than positions to be defended. He draws on psychological research and case studies to describe how overconfidence and identity attachment make people resistant to changing their minds. The book examines rethinking at the individual, interpersonal, and organizational levels, including how to have productive disagreements and how groups can build a culture that rewards updating beliefs. It closes with practical techniques for eliciting doubt in oneself and others.
AmazonUrl:

## Category: Finding the Idea
Description: Books on how new ideas surface, get championed, and get tested.

### Book: Originals
Hero: true
Author: Adam Grant
Year: 2016
CoverUrl: https://covers.openlibrary.org/b/isbn/9780525429562-L.jpg
Tags: Creativity, Innovation, Leadership
Summary: Originals is a book by organizational psychologist Adam Grant about how people introduce and champion new ideas within existing systems.
Detail: Grant argues that people who successfully advance original ideas are not unusually bold risk-takers, and typically hold doubts and delay action rather than acting on impulse. Using research on entrepreneurs, activists, and creative professionals, he examines timing, the tradeoff between conformity and dissent, and how individuals build support for an idea before it gains acceptance. The book covers strategies for evaluating new ideas, managing risk, and voicing dissent within a group. It also addresses how parents, managers, and organizations can encourage originality rather than suppress it.
AmazonUrl:

### Book: Zero to One
Hero: false
Author: Peter Thiel (with Blake Masters)
Year: 2014
CoverUrl: https://covers.openlibrary.org/b/isbn/9780804139298-L.jpg
Tags: Strategy, Innovation, Business Model
Summary: Zero to One is a book by entrepreneur and investor Peter Thiel, developed from notes on a Stanford course he taught on startups.
Detail: Thiel argues that meaningful progress comes from creating something new that did not exist before, which he calls going from zero to one, rather than copying and incrementally improving what already exists, which he calls going from one to n. He argues that durable businesses are built on temporary monopolies created through unique technology, network effects, economies of scale, or branding, and that competition erodes profits rather than rewarding innovation. The book covers how to evaluate a startup idea, build a founding team, and think about the future in terms of definite plans rather than open-ended optionality. It draws on Thiel's experience co-founding PayPal and investing in early-stage technology companies.
AmazonUrl:

### Book: The Ten Faces of Innovation
Hero: false
Author: Tom Kelley (with Jonathan Littman)
Year: 2005
CoverUrl: https://covers.openlibrary.org/b/olid/OL3425795M-L.jpg
Tags: Innovation, Creativity, Leadership
Summary: The Ten Faces of Innovation is a book by IDEO general manager Tom Kelley about roles that support innovation within an organization.
Detail: Kelley proposes ten personas, grouped into learning, organizing, and building roles, such as the Anthropologist, the Experimenter, and the Hurdler, each representing a distinct way of contributing to innovation. He argues that innovation depends less on individual genius than on teams that combine these roles and on countering what he calls the "devil's advocate," a mindset that reflexively shuts down new ideas. Drawing on IDEO project stories, the book describes how each persona behaves in practice and how organizations can identify and develop them among existing staff. It presents innovation as a discipline that can be organized and staffed rather than left to chance.
AmazonUrl:

### Book: Sprint
Hero: false
Author: Jake Knapp (with John Zeratsky and Braden Kowitz)
Year: 2016
CoverUrl: https://covers.openlibrary.org/b/isbn/9781501121746-L.jpg
Tags: Methods, Prototyping, Ideation
Summary: Sprint is a book by Jake Knapp, John Zeratsky, and Braden Kowitz that describes a five-day process for answering critical business questions through prototyping and testing.
Detail: Developed at Google Ventures, the sprint process assigns one day each to mapping the problem, sketching solutions, deciding which idea to build, building a realistic prototype, and testing it with real users. The authors argue that this compressed timeline forces a team to commit to a testable direction instead of debating indefinitely, and that a single facilitator, the "Decider," should have final say to avoid design by committee. The book includes checklists, room setups, and facilitation scripts drawn from sprints the authors ran with startups and established companies. It positions the method as a way to validate an idea before committing engineering time to it.
AmazonUrl:

## Category: Doing the Work
Description: Books on the concrete research and design methods used to carry out that work.

### Book: 101 Design Methods
Hero: true
Author: Vijay Kumar
Year: 2012
CoverUrl: https://covers.openlibrary.org/b/olid/OL29116100M-L.jpg
Tags: Design Research, Methods, Innovation
Summary: 101 Design Methods is a book by Vijay Kumar that organizes design and innovation activities into a structured, repeatable process.
Detail: Kumar presents a seven-mode framework, sense intent, know context, know people, frame insights, explore concepts, frame solutions, and realize offerings, and places 101 named methods within it, from ethnographic research techniques to concept-evaluation matrices. Each method is described with its purpose, the steps to run it, and the kind of output it produces. The book argues that innovation work benefits from a shared vocabulary and sequence rather than ad hoc brainstorming. It is written as a practitioner's reference rather than a narrative, intended to be consulted method by method.
AmazonUrl:

### Book: Universal Methods of Design
Hero: false
Author: Bella Martin and Bruce Hanington
Year: 2012
CoverUrl: https://covers.openlibrary.org/b/isbn/9781592537563-L.jpg
Tags: Design Research, Methods
Summary: Universal Methods of Design is a book by Bella Martin and Bruce Hanington that catalogs research and design methods used across the design process.
Detail: The book presents each method on a standardized two-page spread covering its purpose, procedure, and a real-world example, covering methods from user interviews and card sorting to prototyping and usability testing. It groups methods loosely by where they are typically used, from early research through concept development to evaluation. The authors intend it as a reference for practitioners and students who need a consistent explanation of an unfamiliar method rather than a book read start to finish. Later editions expanded the original set of methods.
AmazonUrl:

### Book: Convivial Toolbox
Hero: false
Author: Elizabeth Sanders and Pieter Jan Stappers
Year: 2012
CoverUrl: https://covers.openlibrary.org/b/isbn/9789063692841-L.jpg
Tags: Design Research, Methods, Design Thinking
Summary: Convivial Toolbox is a book by Elizabeth Sanders and Pieter Jan Stappers about generative research methods used early in the design process.
Detail: The authors argue for involving the people a design is intended for directly in the creative process, using visual and tactile exercises such as collages, diagrams, and simple modeling kits to surface needs and ideas that interviews alone do not reveal. They distinguish generative research, which invites participants to make and tell, from more conventional evaluative research conducted after a design already exists. The book combines an overview of the field's history with case studies showing generative techniques applied to real projects. It closes with practical guidance on planning a generative research session and analyzing what participants produce.
AmazonUrl:

### Book: The Field Guide to Human-Centered Design
Hero: false
Author: IDEO.org
Year: 2015
CoverUrl: https://covers.openlibrary.org/b/isbn/9780991406319-L.jpg
Tags: Design Research, Methods, Design Thinking
Summary: The Field Guide to Human-Centered Design is a book by IDEO.org that introduces human-centered design to organizations working on social impact problems.
Detail: The book organizes 57 methods across three phases, Inspiration, Ideation, and Implementation, walking a team from initial research with a community through generating concepts to piloting a solution. It emphasizes direct contact with the people a project is meant to serve, including guidance on conducting interviews and structuring co-creation sessions. Worksheets and case studies from IDEO.org projects in health, agriculture, and economic development illustrate each phase. The guide was funded through a public crowdfunding campaign and is distributed by IDEO.org for free.
AmazonUrl:

## Category: Setting the Strategy
Description: Books on connecting design and innovation to strategic choice and business model logic.

### Book: Playing to Win
Hero: true
Author: A.G. Lafley and Roger Martin
Year: 2013
CoverUrl: https://covers.openlibrary.org/b/isbn/9781422187395-L.jpg
Tags: Strategy, Business Model
Summary: Playing to Win is a book by former Procter & Gamble CEO A.G. Lafley and strategist Roger Martin that presents a framework for making strategic choices.
Detail: The authors argue that strategy is a set of five interrelated choices, a winning aspiration, where to play, how to win, the capabilities required, and the management systems needed to sustain them, made together rather than treated as a planning exercise that produces a document. They illustrate the framework mainly through Lafley's experience running P&G brands such as Olay and Swiffer, showing how narrowing where to compete clarified how to compete there. The book contrasts real strategic choice with vague mission statements and unprioritized goal lists, which it treats as a failure to choose at all. It closes with a set of questions intended to stress-test an organization's existing strategy.
AmazonUrl:

### Book: Ten Types of Innovation
Hero: false
Author: Larry Keeley, Helen Walters, Ryan Pikkel, and Brian Quinn
Year: 2013
CoverUrl: https://covers.openlibrary.org/b/isbn/9781118504246-L.jpg
Tags: Innovation, Strategy, Business Model
Summary: Ten Types of Innovation is a book by Larry Keeley, Helen Walters, Ryan Pikkel, and Brian Quinn that presents a framework for identifying innovation opportunities beyond new products.
Detail: The authors group ten types of innovation into three categories, configuration (including profit model, network, structure, and process), offering (product performance and product system), and experience (service, channel, brand, and customer engagement), arguing that companies default to product innovation while leaving the other types unexamined. They present research suggesting that innovations combining several types are harder for competitors to copy than a single product improvement. The book includes an assessment tool for mapping where a company's innovation activity is concentrated relative to its industry. Case studies from consumer and business-to-business companies illustrate types that are frequently overlooked, such as profit model and network innovation.
AmazonUrl:

### Book: The Design of Business
Hero: false
Author: Roger Martin
Year: 2009
CoverUrl: https://covers.openlibrary.org/b/isbn/9781422177808-L.jpg
Tags: Design Thinking, Strategy, Innovation
Summary: The Design of Business is a book by strategist Roger Martin that argues design thinking should be treated as a core business discipline alongside analytical management.
Detail: Martin presents a three-stage "knowledge funnel," moving from mystery to heuristic to algorithm, and argues that companies relying only on analytical, data-driven thinking eventually commoditize their advantage as competitors copy the algorithm. He argues that organizations need to balance exploiting proven algorithms with continuing to explore new mysteries, a balance he calls the design of business. The book uses examples including Procter & Gamble, RIM (BlackBerry), and Cirque du Soleil to illustrate companies operating at different points in the funnel. It positions abductive reasoning, reasoning toward what could be true, as a third mode of thinking alongside deductive and inductive logic.
AmazonUrl:

### Book: Business Model Generation
Hero: false
Author: Alexander Osterwalder and Yves Pigneur
Year: 2010
CoverUrl: https://covers.openlibrary.org/b/isbn/9780470876411-L.jpg
Tags: Business Model, Strategy, Methods
Summary: Business Model Generation is a book by Alexander Osterwalder and Yves Pigneur that introduces the Business Model Canvas, a one-page tool for describing how an organization creates and captures value.
Detail: The canvas divides a business model into nine building blocks, including customer segments, value propositions, channels, revenue streams, and cost structure, arranged so the connections between blocks are visible on one page. The authors argue that mapping these blocks together makes it easier to spot where a business model is inconsistent, for example a value proposition that does not match the chosen channel or customer segment. The book was developed collaboratively with several hundred practitioners and is presented in a visual, workbook-like format rather than as continuous prose. It includes patterns, design techniques, and case studies showing the canvas applied to companies such as Skype and Nintendo.
AmazonUrl:

## Category: Learning the Groundwork
Description: Books on the systems thinking, usability, service design, and strategy foundations the rest of this site draws on.

### Book: Thinking in Systems
Hero: true
Author: Donella Meadows
Year: 2008
CoverUrl: https://covers.openlibrary.org/b/isbn/9781603580557-L.jpg
Tags: Systems, Strategy
Summary: Thinking in Systems is a book by environmental scientist Donella Meadows about systems thinking, edited and published posthumously in 2008.
Detail: Meadows explains systems as arrangements of stocks, flows, and feedback loops, and argues that a system's structure, not the intentions of the people within it, determines its behavior over time. She introduces the concept of leverage points, places where a small, targeted change can shift a system's behavior, and ranks them from least to most effective, with changing a system's underlying goal or paradigm at the top of the list. The book uses examples including population growth, corporate behavior, and resource depletion to show how systems produce counterintuitive outcomes such as policy resistance, where an intervention is absorbed and the original problem returns. It closes with practical guidance on observing a system before intervening in it.
AmazonUrl:

### Book: The Design of Everyday Things
Hero: false
Author: Don Norman
Year: 1988
CoverUrl: https://covers.openlibrary.org/b/isbn/9780465050659-L.jpg
Tags: Design Thinking, Methods
Summary: The Design of Everyday Things is a book by cognitive scientist Don Norman about how the design of physical and digital objects shapes their usability.
Detail: Norman argues that when people struggle to use an object, such as a door pushed the wrong way or a stove with confusing controls, the fault usually lies with the design rather than the user. He introduces affordances, signifiers, mapping, and feedback as the elements that make an object's correct use apparent without instructions. The book examines everyday errors and confusing designs across doors, light switches, faucets, and control panels to illustrate these principles. First published in 1988 and later revised, it argues that good design should be evaluated by how well it communicates its own use.
AmazonUrl:

### Book: This Is Service Design Doing
Hero: false
Author: Marc Stickdorn, Markus Hormess, Adam Lawrence, and Jakob Schneider
Year: 2018
CoverUrl: https://covers.openlibrary.org/b/isbn/9781491927182-L.jpg
Tags: Service Design, Methods, Design Research
Summary: This Is Service Design Doing is a book by Marc Stickdorn, Markus Hormess, Adam Lawrence, and Jakob Schneider about applying service design methods to real projects.
Detail: The authors present service design as a way of designing the front-stage and back-stage elements of a service together, including staff actions, physical environments, and digital touchpoints a customer does not see directly. The book organizes methods around a research, ideation, prototyping, and implementation cycle, with tools such as customer journey maps, service blueprints, and stakeholder maps explained step by step. It includes contributed case studies from practitioners in industries including banking, healthcare, and transportation showing the methods applied under real project constraints. The authors emphasize facilitation and team dynamics alongside the methods themselves, arguing that a workshop's design affects its output as much as the tools used within it.
AmazonUrl:

### Book: Good Strategy / Bad Strategy
Hero: false
Author: Richard Rumelt
Year: 2011
CoverUrl: https://covers.openlibrary.org/b/isbn/9780307886231-L.jpg
Tags: Strategy, Leadership
Summary: Good Strategy/Bad Strategy is a book by strategy professor Richard Rumelt that distinguishes real strategy from common substitutes for it.
Detail: Rumelt argues that most documents labeled "strategy" are restated goals, vision statements, or budget lists that avoid the work of choosing what to do and what not to do. He defines a good strategy as a coherent set of analysis, an overall approach, and coordinated action built around a "kernel" of diagnosis, guiding policy, and coherent action, all addressing a specific challenge. The book identifies common failures such as fluff, failure to face the problem, and mistaking goals for strategy, illustrating each with corporate and military examples. It argues that a good strategy concentrates resources and effort on a small number of pivotal objectives rather than spreading them across every goal an organization holds.
AmazonUrl:
